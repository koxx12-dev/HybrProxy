import { NotificationLevel } from '@minecraft-js/lunarbukkitapi';
import { config, player } from '../..';
import Item from '../../Classes/Item';
import PlayerModule from '../PlayerModule';

const settingItem = new Item(4);
settingItem.displayName = '§5§lLC §r§fStaff Mods §7(X-RAY)';
settingItem.lore = [
  '',
  '§7Enable §fStaff Mods §7For §5Lunar Client',
  '',
  `§7Current: §${config?.modules.staffMods ? 'aEnabled' : 'cDisabled'}`,
];

const playerModule = new PlayerModule(
  'LC Staff Mods',
  'Enable Staff Mods For Lunar Client',
  settingItem,
  'staffMods'
);

function enableStaffMods(notify = true) {
  if (notify)
    player.customClient.sendNotification(
      'Enabled Staff Mods',
      1500,
      NotificationLevel.INFO
    );

  player.customClient.setAllStaffModStates(true);
}
function disableStaffMods(notify = true) {
  if (notify)
    player.customClient.sendNotification(
      'Disabled Staff Mods',
      1500,
      NotificationLevel.INFO
    );

  player.customClient.setAllStaffModStates(false);
}

player.listener.on('switch_server', () => {
  setTimeout(() => {
    if (playerModule.enabled) enableStaffMods(false);
    else disableStaffMods(false);
  }, 2000);
});

playerModule.onConfigChange = (enabled) => {
  if (enabled) enableStaffMods(true);
  else disableStaffMods(true);
};

export default playerModule;
