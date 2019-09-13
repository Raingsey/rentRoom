import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PageDashboardComponent } from './dashboard/dashboard.component';
import { PageForgotComponent } from './auth-pages/forgot/forgot.component';
import { PageConfirmComponent } from './auth-pages/confirm/confirm.component';
import { Page404Component } from './extra-pages/page-404/page-404.component';
import { Page500Component } from './extra-pages/page-500/page-500.component';

import { UserComponent } from './user/user.component';
import { UserService} from './user/user.service';
import { RoleComponent } from './role/role.component';
import { TreeviewModule } from 'ngx-treeview';
import { LoginComponent } from './auth-pages/login/login.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserRoleService } from './user-role/user-role.service';
import { CustomerComponent } from './customer/customer.component';
import { CustomerService } from './customer/customer.service';
import { FormSetComponent } from './my-components/form-set/form-set.component';

// Prime NG
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SpinnerModule } from 'primeng/spinner';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { DataGridModule } from 'primeng/datagrid';
import { LightboxModule } from 'primeng/lightbox';
import { GrowlModule } from 'primeng/growl';
import { InputMaskModule } from 'primeng/inputmask';
import {MultiSelectModule} from 'primeng/multiselect';
import {ToolbarModule} from 'primeng/toolbar';
import {CardModule} from 'primeng/card';

import { NationalityComponent } from './nationality/nationality.component';
import { NationalityService } from './nationality/nationality.service';
import { ListComponent } from './my-components/list/list.component';
import { ListDeepComponent } from './my-components/list-deep/list-deep.component';
import { DeepListPipe } from './my-pipes/deep-list.pipe';
import { DynamicPipe } from './my-pipes/dynamic.pipe';
import { CreditTermComponent } from './credit-term/credit-term.component';
import { CreditTermService } from './credit-term/credit-term.service';
import { DisableControlDirective } from './my-directives/disable-control.directive';
import { GetNamePipe } from './my-pipes/get-name.pipe';
import { FileUploadComponent } from './my-components/file-upload/file-upload.component';
import { BaseComponent } from './main/base/base.component';
import { SelectComponent } from './my-components/select/select.component';
import { NullShowPipe } from './my-pipes/null-show.pipe';
import {PictureBlogComponent} from './my-components/picture-set/picture-set.component';
import {FileUploadModule} from 'primeng/primeng';
import {MessageService} from 'primeng/components/common/messageservice';
import { ProfileComponent } from './profile/profile.component';
import {ProfileService} from './profile/profile.service';
import { UsersComponent } from './users/users.component';
import {UsersService} from './users/users.service';
import { TransactionInquiryComponent } from './transaction-inquiry/transaction-inquiry.component';
import {ListCustomComponent} from './my-components/list-custom/list-custom.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {TransactionService} from './transaction-inquiry/transaction.service';
import {RefundDialogComponent} from './refund-dialog/refund-dialog.component';
import {RefundService} from './refund/refund.service';
import {StatusShowPipe} from './my-pipes/status.pipe';
import {VoidDialogComponent} from './void-dialog/void-dialog.component';
import {PipeHelper} from '../helper/pipe-helper';
import { PostComponent } from './post/post.component';
import { HousesComponent } from './houses/houses.component';
import {HousesService} from './houses/houses.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PanelModule,
        ChartModule,
        ConfirmDialogModule,
        PanelModule,
        ChartModule,
        TableModule,
        InputTextModule,
        DialogModule,
        ButtonModule,
        SpinnerModule,
        PaginatorModule,
        InputTextareaModule,
        CalendarModule,
        CheckboxModule,
        RadioButtonModule,
        AutoCompleteModule,
        DropdownModule,
        DataGridModule,
        GrowlModule,
        InputMaskModule,
        TreeviewModule,
        LightboxModule,
        FileUploadModule,
        MultiSelectModule,
        ToolbarModule,
        CardModule
    ],
    declarations: [
        PageDashboardComponent,
        PageForgotComponent,
        PageConfirmComponent,
        Page404Component,
        Page500Component,
        UserComponent,
        RoleComponent,
        LoginComponent,
        UserRoleComponent,
        ChangePasswordComponent,
        CustomerComponent,
        FormSetComponent,
        NationalityComponent,
        ListComponent,
        ListDeepComponent,
        DeepListPipe,
        StatusShowPipe,
        ListDeepComponent,
        DynamicPipe,
        CreditTermComponent,
        DisableControlDirective,
        CreditTermComponent,
        GetNamePipe,
        FileUploadComponent,
        BaseComponent,
        SelectComponent,
        NullShowPipe,
        SelectComponent,
        PictureBlogComponent,
        ProfileComponent,
        UsersComponent,
        TransactionInquiryComponent,
        ListCustomComponent,
        RefundDialogComponent,
        VoidDialogComponent,
        PipeHelper,
        PostComponent,
        HousesComponent
    ],
    providers: [
        UserService,
        UserRoleService,
        // ChangePasswordService,
        CustomerService,
        ConfirmationService,
        NationalityService,
        CreditTermService,
        CreditTermService,
        MessageService,
        ProfileService,
        UsersService,
        TransactionService,
        RefundService,
        HousesService
    ],
    entryComponents: [
    ]
})
export class PagesModule {}
