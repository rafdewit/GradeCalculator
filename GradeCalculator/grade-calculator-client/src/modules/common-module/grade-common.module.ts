import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { GridTileBlobComponent } from './grid/grid-tile-blob/grid-tile-blob.component';
import { GridListComponent } from './grid/grid-list/grid-list.component';
import { GridTileBlobTemplateRefComponent } from './grid/grid-tile-blob-template-ref/grid-tile-blob-template-ref.component';
import { ThemeContainerComponent } from './theme/theme-container/theme-container.component';
import { ThemeSelectorComponent } from './theme/theme-selector/theme-selector.component';

@NgModule({
    declarations: [
        GridTileBlobComponent,
        GridListComponent,
        GridTileBlobTemplateRefComponent,
        ThemeContainerComponent,
        ThemeSelectorComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        DragDropModule
    ],
    exports: [
        GridListComponent,
        GridTileBlobTemplateRefComponent,
        ThemeContainerComponent,
        ThemeSelectorComponent
    ],
    providers: [

    ],
})
export class GradeCommonModule {}