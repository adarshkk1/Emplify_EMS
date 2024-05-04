import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  //user
  const auth= new AuthService();
  const router = new Router();
  if(auth.user){
    if(auth.user.admin){
      return router.navigate(['/home']);
    }
    else{
      return true
    }
  }
  else{
    return router.navigate(['/home']);;
  }
  
}