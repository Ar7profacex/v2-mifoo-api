import { EPaymentMethod, EPaymentMethodStr, EStatusOrder, EStatusShift, ETypeDocument, ETypeDocumentStr, ExceptionEnum, IAccount } from '@ar7profacex/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PosOrder } from 'src/common/entities/pos-order.entity';
import { PosShift } from 'src/common/entities/pos-shift.entity';
import { ViewMtDashboard } from 'src/common/entities/view-mt-dashboard.entity';
import { HttpExceptionWM } from 'src/common/exceptions/http.exception';
import { In, Not, Repository } from 'typeorm';

@Injectable()
export class SalesService {
  private _logger: Logger = new Logger(SalesService.name);

  constructor(
    @InjectRepository(PosShift)
    private posShiftRepository: Repository<PosShift>,
    @InjectRepository(ViewMtDashboard)
    private viewMtDashboardRepository: Repository<ViewMtDashboard>,
    @InjectRepository(PosOrder)
    private posOrderRepository: Repository<PosOrder>,
  ) { }

  async byShift(shiftId: string, typeReport: 'sales' | 'daily', account: IAccount): Promise<any[]> {
    const shift = await this.posShiftRepository.findOne({
      where: {
        uuId: shiftId
      }
    });
    if (!shift) {
      throw new HttpExceptionWM({
        type: ExceptionEnum.NOT_FOUND,
        messageDetail: `shift_not_found`,
      });
    }

    const sales = await this.viewMtDashboardRepository.find({
      relations: {
        posOrder: {
          posOrderDetails: {
            posProduct: true
          }
        },
        posDocument: true,
        posShift: true,
        posMarket: {
          unity: true
        },
        posPoint: true
      },
      select: {
        posMarket: {
          id: true,
          config: null,
          unity: {
            id: true,
            name: true,
            description: true,
            alias: true,
            info: null,
          }
        },
        posPoint: {
          id: true,
          number: true,
          name: true,
          description: true,
        },
        posOrder: {
          id: true,
          number: true,
          document: true,
          status: true,
          posOrderDetails: {
            id: true,
            posProduct: {
              id: true,
              alias: true,
              name: true,
              image: true
            }
          }
        },
        posDocument: {
          id: true,
          number: true,
          document: true
        },
        posShift: {
          id: true,
          status: true,
          opened_at: true,
          closed_at: true,
        }
      },
      where: {
        idShift: shift.id
      },
      order: {
        dateTimeOrder: 'DESC'
      }
    });

    if (typeReport === 'daily') {
      return sales;
    }

    const idOrders = sales.map((sale) => +sale.posOrder.id);
    const ordersNoSale = await this.posOrderRepository.find({
      relations: {
        author: true,
        posPoint: {
          posMarket: {
            posCompany: true,
            unity: true
          }
        },
        posOrderDetails: {
          posProduct: true
        },
        posShift: true,
        posContact: true,
        posDeliveryMan: true,
      },
      select: {
        posOrderDetails: {
          id: true,
          posProduct: {
            id: true,
            alias: true,
            name: true,
            image: true
          }
        },
        posContact: {
          id: true,
          name: true,
          phone: true,
        },
        posDeliveryMan: {
          id: true,
          name: true,
          phone: true,
          run: true,
          dv: true,
        },
        posPoint: {
          id: true,
          number: true,
          name: true,
          description: true,
          posMarket: {
            id: true,
            name: true,
            config: null,
            posCompany: {
              id: true,
              name: true,
              run: true,
              dv: true
            },
            unity: {
              id: true,
              name: true,
              description: true,
              alias: true,
              info: null,
            }
          }
        },
        posShift: {
          id: true,
          status: true,
          opened_at: true,
          closed_at: true,
        }
      },
      where: {
        id: Not(In(idOrders)),
        fkid_pos_shift: shift.id,
        status: EStatusOrder.SOLICITADO//NO PAGADO
      }
    });

    const ordersNoSaleList = ordersNoSale.map((order) => {
      const posDeliveryMan = order.posDeliveryMan;
      const posContact = order.posContact;
      delete order.posDeliveryMan;
      delete order.posContact;
      delete order.dataFreeze;

      order.idDocument = 0;
      order.numberDocument = 0;
      order.idOrder = order.id;
      order.numberOrder = order.number;
      order.valueDocument = order.value;
      order.taxesDocument = 0;
      order.subValueDocument = 0;
      order.valueGratDocument = 0;
      order.payDocument = 0;
      order.changeDocument = 0;
      order.valueDeliveryDocument = 0;
      order.typeDocument = ETypeDocumentStr.SELECCIONAR;
      order.methodDocument = EPaymentMethodStr.SELECCIONAR;
      order.idPoint = order.fkid_pos_point;
      order.point = order.posPoint.number;
      order.idMarket = order.posPoint.posMarket.id;
      order.market = order.posPoint.posMarket.name;
      order.idCompany = order.posPoint.posMarket.posCompany.id;
      order.company = order.posPoint.posMarket.posCompany.name;
      order.runCompany = `${order.posPoint.posMarket.posCompany.run}-${order.posPoint.posMarket.posCompany.dv}`;
      order.idUser = order.sesion;
      order.nameUser = order.author.name;
      order.typeOrder = order.type;
      order.dateTimeOrder = order.created_at;
      order.dateOrder = order.created_at;
      order.dateUpdated = order.updated_at;
      order.idShift = order.fkid_pos_shift;
      order.posMarket = order.posPoint.posMarket;
      order.posOrder = structuredClone(order);
      order.posMarket = {
        id: order.posPoint.posMarket.id,
        config: order.posPoint.posMarket.config,
        unity: order.posPoint.posMarket.unity
      };
      order.client = posContact?.name ?? "";
      order.deliveryMan = posDeliveryMan?.name ?? "";

      return order;
    });

    return [...sales, ...ordersNoSaleList].sort((a, b) => b.dateTimeOrder.getTime() - a.dateTimeOrder.getTime());
  }

  async shiftsByPoint(pointId: number, account: IAccount): Promise<PosShift[]> {
    return await this.posShiftRepository.find({
      where: {
        fkid_pos_point: pointId
      },
      order: {
        opened_at: 'DESC'
      },
      take: 100
    });
  }
}
