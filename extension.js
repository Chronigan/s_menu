const Main = imports.ui.main;
const St = imports.gi.St;
const GObject = imports.gi.GObject;
const Gio = imports.gi.Gio;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const ThisExtension = imports.misc.extensionUtils.getCurrentExtension();
const Util = imports.misc.util;

let myPopup;

//creates the menu class
const MyPopup = GObject.registerClass(
class MyPopup extends PanelMenu.Button {

  _init () {

    super._init(0);
    //Place icon on top menu
    let icon = new St.Icon({icon_name : 'gnome-main-menu', style_class : 'system-status-icon',});
    this.add_child(icon);

    //populate the menu
      //System monitor
      let systemMonitor = new PopupMenu.PopupMenuItem('System Monitor');
      this.menu.addMenuItem(systemMonitor);
      systemMonitor.connect('activate', () => Util.spawn(['gnome-system-monitor']));

      //Pamac
      let addRemove = new PopupMenu.PopupMenuItem('Add/Remove Software');
      this.menu.addMenuItem(addRemove);
      addRemove.connect('activate', () => Util.spawn(['pamac-manager']))

        //Settings submenu
        let  settingsMenu = new PopupMenu.PopupSubMenuMenuItem('Settings');
        this.menu.addMenuItem(settingsMenu);
          //populate submenu
            //info Center
            let infoCenter = new PopupMenu.PopupMenuItem('Info Center');
            settingsMenu.menu.addMenuItem(infoCenter);
            infoCenter.connect('activate', () => Util.spawn(['gnome-control-center' , 'info-overview']));

            //Network
            let network = new PopupMenu.PopupMenuItem('Network');
            settingsMenu.menu.addMenuItem(network);
            network.connect('activate', () => Util.spawn(['gnome-control-center' , 'network']));

            //Tweaks
            let tweaks = new PopupMenu.PopupMenuItem('Tweaks');
            settingsMenu.menu.addMenuItem(tweaks);
            tweaks.connect('activate', () => Util.spawn(['gnome-tweaks']));

            //Extensions
            let extensions = new PopupMenu.PopupMenuItem('Extensions');
            settingsMenu.menu.addMenuItem(extensions);
            extensions.connect('activate', () => Util.spawn(['gnome-extensions-app']));

      //Seperator
      this.menu.addMenuItem( new PopupMenu.PopupSeparatorMenuItem() );

      //Session submenu
      let  sessionMenu = new PopupMenu.PopupSubMenuMenuItem('Session');
      this.menu.addMenuItem(sessionMenu);

        //Populate session Menu
          //logout
          let logout = new PopupMenu.PopupMenuItem('Logout');
          sessionMenu.menu.addMenuItem(logout);
          logout.connect('activate', () => Util.spawn(['gnome-session-quit' , '--logout']));

          //suspend
        /*  let suspend = new PopupMenu.PopupMenuItem('Suspend');
          sessionMenu.menu.addMenuItem(Suspend);
          logout.connect('activate', () => Util.spawn(['systemctl', 'suspend']));
        */  
          //reboot
          let reboot = new PopupMenu.PopupMenuItem('Reboot');
          sessionMenu.menu.addMenuItem(reboot);
          reboot.connect('activate', () => Util.spawn(['gnome-session-quit' , '--reboot']));

          //shutdown
          let shutdown = new PopupMenu.PopupMenuItem('Shutdown');
          sessionMenu.menu.addMenuItem(shutdown);
          shutdown.connect('activate', () => Util.spawn(['gnome-session-quit' , '--shutdown']));
  }

});

function init() {
}

function enable() {
  myPopup = new MyPopup();
  Main.panel.addToStatusArea('myPopup', myPopup, 1, 'left');
}

function disable() {
  myPopup.destroy();
}
