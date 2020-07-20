const Main = imports.ui.main;
const St = imports.gi.St;
const GObject = imports.gi.GObject;
const Gio = imports.gi.Gio;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const ThisExtension = imports.misc.extensionUtils.getCurrentExtension();


function init()
{
  let icon = new St.Icon({icon_name : 'security-low-symbolic'});
}

function enable()
{
  Main.panel._leftBox.insert_child_at_index(icon, 1);
}

function disable()
{
  Main.panel._leftBox.remove_child(icon);
}
