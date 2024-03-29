/*
 * @Author: yangyufeng
 * @Date: 2022-04-25 17:44:13
 * @LastEditTime: 2022-04-25 18:34:17
 * @LastEditors: Please set LastEditors
 * @Description: indexDB 替换 sessionStorage
 * @FilePath: /adsdesk-web-fixbug/src/libs/idb.js
 */
import DB from './libs/DB'
import Idb from './libs/Idb'
import config from "./config"
export default function openDb() {
  var {dbName,version,tables} = config
  return Idb({dbName,version,tables})
}
