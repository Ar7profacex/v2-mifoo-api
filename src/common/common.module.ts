import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ApisUrl } from "./utils/apis-url.util";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HttpModule } from "@nestjs/axios";
import { PosShift } from "./entities/pos-shift.entity";
import { PosCompany } from "./entities/pos-company.entity";
import { PosMarket } from "./entities/pos-market.entity";
import { PosPoint } from "./entities/pos-point.entity";
import { PosPrintQueue } from "./entities/pos-print-queue.entity";
import { PosPrinter } from "./entities/pos-printer.entity";
import { ViewMtDashboard } from "./entities/view-mt-dashboard.entity";
import { PosOrder } from "./entities/pos-order.entity";
import { PosOrderDetail } from "./entities/pos-order-detail.entity";
import { PosDocument } from "./entities/pos-document.entity";
import { PosDocumentFile } from "./entities/pos-document-file.entity";
import { User } from "./entities/user.entity";
import { UserData } from "./entities/user-data.entity";
import { SysProfile } from "./entities/sys-profile.entity";

@Module({
  providers: [
    ApisUrl,
  ],
  imports: [
    ConfigModule,
    HttpModule,
    TypeOrmModule.forFeature([
      PosShift, PosCompany, PosMarket, PosPoint, PosPrintQueue, PosPrinter, ViewMtDashboard,
      PosOrder, PosOrderDetail, PosDocument, PosDocumentFile,
      User, UserData, SysProfile
    ]),
  ],
  exports: [
    ApisUrl,
    TypeOrmModule,
  ],
})
export class CommonModule { }
