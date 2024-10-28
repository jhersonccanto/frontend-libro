import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarModule,ButtonModule,AvatarModule,AvatarGroupModule,StyleClassModule,RippleModule,RouterLink,CardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e:Event): void {
      this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;
}
