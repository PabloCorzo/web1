require('dotenv').config();
const os = require('os');

//system info && node version
let system_arch = process.arch;
let system_cwd = process.cwd();
let system_os= process.platform;
let system_node_version= process.version;

let static_str = "Arquitectura: " + system_arch + " | Directorio de trabajo: " + system_cwd + " | Sistema operativo: " + system_os
 + " | Versión de node: " + system_node_version;

//refresh periodico uso de cpu,memoria,uptime,node.js uptime
function getPeriodicStr() {
  let cpu = process.cpuUsage();
  let cpu_usage = "user " + cpu.user + "µs, system " + cpu.system + "µs";
  let mem_usage = Math.round(process.memoryUsage().rss / 1024 / 1024) + " MB";
  let pc_uptime = os.uptime();
  let node_uptime= process.uptime();

  return "Uso de cpu: " + cpu_usage + " | Uso de memoria: " + mem_usage + " | Tiempo activo del sistema: " + pc_uptime
   + " | Tiempo activo de node: " + node_uptime;
}

console.log(static_str);
console.log(getPeriodicStr());

setInterval(() => {
  console.log(getPeriodicStr());
}, process.env.REFRESH_RATE);
