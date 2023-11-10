import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
 import {
  BasicUsageComponent,
  FadeOutComponent,
  SmartBackspaceComponent,
  ShuffledComponent,
  DocumentationComponent,
} from './components';
import { NgxTypedWriterModule } from 'ngx-typed-writer';

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
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
