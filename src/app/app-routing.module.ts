import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {PortalGuard} from './providers/guards/portal/portal.guard';
import {SignGuard} from './providers/guards/sign/sign.guard';

const routes: Routes = [
  { path: '', redirectTo: 'store-portal', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'sign_in', loadChildren: () => import('./pages/entry/sign-in/sign-in.module').then( m => m.SignInPageModule),
    canActivate: [SignGuard]
  },
  {
    path: 'sign_up', loadChildren: () => import('./pages/entry/sign-up/sign-up.module').then( m => m.SignUpPageModule),
    canActivate: [SignGuard]
  },
  {
    path: 'store-portal',
    loadChildren: () => import('./pages/store/store-portal/store-portal.module').then( m => m.StorePortalPageModule),
    canActivate: [PortalGuard]
  },
  {
    path: 'store-details/:param1/:param2/:param3',
    loadChildren: () => import('./pages/store/store-details/store-details.module').then( m => m.StoreDetailsPageModule),
    canActivate: [PortalGuard]
  },
  {
    path: 'store-admin',
    loadChildren: () => import('./pages/store/store-admin/store-admin.module').then( m => m.StoreAdminPageModule)
  },
  {
    path: 'receipts',
    loadChildren: () => import('./pages/user/receipts/receipts.module').then( m => m.ReceiptsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
