import si from "systeminformation";
import fs from "fs/promises"
si.cpu()
  .then(data => console.log(`CPU => ${data.brand}`))
  .catch(error => console.error(error));
si.graphics()
  .then(data => console.log(`GPU => ${data.controllers[0].model}`))
  .catch(error => console.error(error));
si.osInfo()
  .then(data => console.log(`OS => ${data.platform}`))
  .catch(error => console.error(error));
si.battery()
  .then(data => console.log(`BATTERY => ${data.percent}, ${data.maxCapacity}mah`))
  .catch(error => console.error(error));
