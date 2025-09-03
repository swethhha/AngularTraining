import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-unauthorized',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <h2>Unauthorized Access</h2>
    <p>You do not have permission to view this page.</p>
    <a routerLink="/login">Go to Login</a>`
})
export class UnauthorizedComponent {}
