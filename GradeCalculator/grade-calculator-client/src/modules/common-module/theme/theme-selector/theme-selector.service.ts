import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AvantTheme, ThemeType } from "./avant-theme";
export const THEME = 'THEME';

@Injectable({ providedIn: 'root' })
export class ThemeSelectorService {
    lightTheme: AvantTheme = { name: "Blue Light", class: "light-theme", type: ThemeType.Light };
    darkTheme: AvantTheme = { name: "Blue Dark", class: "dark-theme", type: ThemeType.Dark };

    public themes: AvantTheme[] = [this.lightTheme, this.darkTheme];
    public selectedTheme$ = new BehaviorSubject<AvantTheme>(this.getThemeFromStorage());

    getThemeFromStorage(): AvantTheme {
        const themeName = localStorage.getItem(THEME);
        return this.themes.find(t => t.name === themeName) ?? this.lightTheme;
    }

    themeChanged(event: AvantTheme): void {
        localStorage.setItem(THEME, event.name);
        this.selectedTheme$.next(event);
    }
}