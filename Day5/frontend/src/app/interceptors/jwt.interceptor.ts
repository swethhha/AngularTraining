import { HttpInterceptorFn } from '@angular/common/http';

export class jwtInterceptor {
  static withToken: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next(req);
  };
}
