import { Injectable, Output, ɵSWITCH_RENDERER2_FACTORY__POST_R3__ } from "@angular/core";
import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { strictEqual } from 'assert';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    errorInt: any;
    intercept(req: import('@angular/common/http').HttpRequest<any>, next:
     import('@angular/common/http').HttpHandler): import('rxjs')
     .Observable<import('@angular/common/http').HttpEvent<any>> {
        //throw new Error('Method not implemented.'); - remove it
        return next.handle(req).pipe(
            catchError(error => { 
                if(error.status === 401)
                {
                    return throwError(error.statusText);
                }
                if(error.status === 400)//my code
                {
                    console.log("THIS IS THE ERROR:");//return
                    console.log("status: " + error.status);
                    console.log("status: " + error.statusText);
                    console.log("ok: " + error.ok);
                    console.log("http error: " + error.error);
                    console.log("url: " + error.url);
                    console.log("headers: " + error.headers);
                    console.log("message: " + error.message);
                    console.log("title: " + error.error.title);
                    if(typeof error.error.errors === 'object')
                    {
                      console.log("password: " + error.error.errors.Password);
                    }
                    console.log("_______________________");
                    console.log(error);
                    console.log("_______________________");

                }//end of my code
                if(error instanceof HttpErrorResponse)
                {
                    const applicationError = error.headers.get('Application-Error');
                    if(applicationError)
                    {
                        return throwError(applicationError);
                    }
                }
                const serverError = error.error;
                let modalStateErrors = '';
                if(serverError.errors && typeof serverError.errors === 'object')
                {
                    for(const key in serverError.error)
                    {
                        if(serverError.errors[key])
                        {
                            modalStateErrors += serverError.errors[key] + '\n';
                        }
                    }
                }
                return throwError(modalStateErrors || serverError || 'Server Error');
            }

            )
        )
    }
}

export const ErrorInterceptorProvider = 
{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};