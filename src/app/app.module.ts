import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy,CommonModule } from '@angular/common';
import { AppComponent } from '@app/app.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppLayoutModule } from '@app/layout/app.layout.module';
import { NotfoundComponent } from '@app/demo/components/notfound/notfound.component';
import { ProductService } from '@app/demo/service/product.service';
import { CountryService } from '@app/demo/service/country.service';
import { CustomerService } from '@app/demo/service/customer.service';
import { EventService } from '@app/demo/service/event.service';
import { IconService } from '@app/demo/service/icon.service';
import { NodeService } from '@app/demo/service/node.service';
import { PhotoService } from '@app/demo/service/photo.service';
import { SharedModule } from '@app/shared/sahred.module';
import { ReunionComponent } from '@app/reunion/reunion.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DividerModule } from 'primeng/divider';

import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { ListboxModule } from 'primeng/listbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CreateReunionComponent } from '@app/reunion/create/create-reunion.component';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { ValidateReunionComponent } from './reunion/create/validate-reunion.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { LoginComponent } from './login/login.component';
import { PasswordModule } from 'primeng/password';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { BasicAuthInterceptor, ErrorInterceptor } from './_helpers';
import { ProfileComponent } from './Profile/profile.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { CreatePersonnelComponent } from './personnel/create/create-personnel.component';
import { DialogModule } from 'primeng/dialog';

@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent, 
        ReunionComponent, 
        CreateReunionComponent,
        ValidateReunionComponent,
        LoginComponent,
        ProfileComponent,
        PersonnelComponent  ,
        CreatePersonnelComponent  
    ],
    imports: [
        CommonModule,
        ConfirmDialogModule,
        AppRoutingModule,
        AppLayoutModule,
        ReactiveFormsModule,
        ButtonModule,
        RippleModule,
        SplitButtonModule,
        ToggleButtonModule,
        DividerModule,
        FormsModule,
        AutoCompleteModule,
        CalendarModule,
        DropdownModule,
        InputMaskModule,
        InputNumberModule,
        MultiSelectModule,
        InputTextareaModule,
        RadioButtonModule,
        InputTextModule,
        ListboxModule,
        SelectButtonModule,
        CheckboxModule,
        PasswordModule,
        DialogModule,
        //,SharedModule
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-top-left',
            preventDuplicates: true,
        }), // ToastrModule added
        TableModule,
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
        ,ConfirmationService
    ],
    bootstrap: [AppComponent],
    //exports: [SharedModule]
})
export class AppModule { }
