import si from "systeminformation";
si.cpu()
  .then(data => console.log(`CPU => ${data.brand}`))
  .catch(error => console.error(error));
si.graphics()
  .then(data => console.log(`GPU => ${data.controllers[0].model}`))
  .catch(error => console.error(error));
 