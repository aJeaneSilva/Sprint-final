import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = sessionStorage.getItem("user");

  if(!user) {
    alert("Você precisa fazer login.");
    router.navigate([""]); 
    return false;
  }

  return true;

};
