import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const RoleGuard = (expectedRoles: string | string[]): CanActivateFn => {
    return () => {
        const authService = inject(AuthService);
        const router = inject(Router);
        
        if (!authService.isLoggedIn()) {
            router.navigate(['/login']);
            return false;
        }
        
        const userRole = authService.getUserRole();
        const allowedRoles = Array.isArray(expectedRoles) ? expectedRoles : [expectedRoles];
        
        if (userRole && allowedRoles.includes(userRole)) {
            return true;
        } else {
            router.navigate(['/unauthorized']);
            return false;
        }
    }
}