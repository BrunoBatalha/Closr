import { FormControl, FormGroup } from '@angular/forms';

export interface GenericFormGroup<TFields> extends FormGroup {
	value: TFields;
	controls: {
		[key in keyof TFields]: FormControl;
	};
}
