import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BlankSpaceDirective } from './directives/blank-space.directive';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { CellphonePasswordPipe } from './pipes/cellphone-password.pipe';
import { ModelFilterPipe } from './pipes/model-filter.pipe';
import { TrimFilterPipe } from './pipes/trim-filter.pipe';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule
	],
	providers: [
		
		
	],
	declarations: [
		CellphonePasswordPipe,
		ModelFilterPipe,
		TrimFilterPipe,
		BlankSpaceDirective,
		NumberOnlyDirective
	],
	exports: [
		CellphonePasswordPipe,
		ModelFilterPipe,
		TrimFilterPipe,
		BlankSpaceDirective,
		NumberOnlyDirective
	]
})
export class CoreModule { }
