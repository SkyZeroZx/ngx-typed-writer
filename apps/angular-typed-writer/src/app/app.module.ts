import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NgxTypedWriterModule } from 'ngx-typed-writer';
import {
  BasicUsageComponent,
  FadeOutComponent,
  SmartBackspaceComponent,
  ShuffledComponent,
  DocumentationComponent,
} from './components';

@NgModule({
  declarations: [
    AppComponent,
    BasicUsageComponent,
    FadeOutComponent,
    SmartBackspaceComponent,
    ShuffledComponent,
    DocumentationComponent,
  ],
  imports: [
    BrowserModule,
    NgxTypedWriterModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
