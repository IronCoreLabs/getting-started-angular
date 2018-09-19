import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AvatarHoverComponent } from './components/avatar-hover/avatar-hover.component';
import { ActiveUserComponent } from './components/active-user/active-user.component';
import { NewOrderFormComponent } from './components/new-order-form/new-order-form.component';
import { IronHttpInterceptor } from './services/iron/iron-http-interceptor';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data-service/in-memory-data-service.service';
import { OrderListComponent } from './components/order-list/order-list.component';
import { SelectUserComponent } from './components/select-user/select-user.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { OrderMessageComponent } from './components/order-message/order-message.component';
import { TeamManagementToggleComponent } from './components/team-management-toggle/team-management-toggle.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        AvatarHoverComponent,
        ActiveUserComponent,
        NewOrderFormComponent,
        OrderListComponent,
        SelectUserComponent,
        SnackBarComponent,
        OrderMessageComponent,
        TeamManagementToggleComponent
    ],
    imports: [
        // These are order dependent per Angular docs
        BrowserModule,
        FormsModule,
        // Import HttpClientModule after BrowserModule
        HttpClientModule,
        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
        // and returns simulated server responses.
        // Remove it when a real server is ready to receive requests.
        HttpClientInMemoryWebApiModule.forRoot(
            InMemoryDataService, {
                dataEncapsulation: false,
                passThruUnknownUrl: true,
                put204: false // return entity after PUT/update
            }
        )
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: IronHttpInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
