import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './screens/home/home.component';
import { ToolbarComponent } from './screens/toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CarosalsliderComponent } from './screens/carosalslider/carosalslider.component';
import { NotFoundComponent } from './screens/not-found/not-found.component';
import { LoginComponent } from './screens/login/login.component';
import { SellItemComponent } from './screens/sell-item/sell-item.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { SearchBotComponent } from './screens/search-bot/search-bot.component';
import { FooterComponent } from './screens/footer/footer.component';
import { SignUpComponent } from './screens/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { CategoriesViewHomeComponent } from './screens/categories-view-home/categories-view-home.component';
import { CategoryComponent } from './screens/category/category.component';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { PostAddComponent } from './screens/post-add/post-add.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ViewCategoryComponent } from './screens/category/view-category/view-category.component';
import { AboutUsComponent } from './screens/footer/about-us/about-us.component';
import { PricingComponent } from './screens/pricing/pricing.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    CarosalsliderComponent,
    NotFoundComponent,
    LoginComponent,
    SellItemComponent,
    SearchBotComponent,
    FooterComponent,
    SignUpComponent,
    CategoriesViewHomeComponent,
    CategoryComponent,
    PostAddComponent,
    ViewCategoryComponent,
    AboutUsComponent,
    PricingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
