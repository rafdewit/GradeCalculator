import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
    exports: [
        MatButtonModule,
        MatButtonToggleModule,
        MatTableModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatBadgeModule,
        MatToolbarModule,
        MatTooltipModule,
        MatSlideToggleModule,
        OverlayModule,
        MatCheckboxModule,
        MatRadioModule,
        MatSnackBarModule,
        MatGridListModule
    ],
    providers: [
        { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: { showDelay: 1000, hideDelay: 0, touchendHideDelay: 0, } }
    ],
})
export class MaterialModule {}