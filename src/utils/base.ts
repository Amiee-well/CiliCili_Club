/*
 * @Author: morijiu
 * @Date: 2024-08-31 10:40:18
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-31 10:52:04
 * @Description:
 * @FilePath: \Nexior-main\src\utils\base.ts
 */
export const getMenuInfo = (menu, obj) => {
  for (const item in obj) {
    for (const key in obj[item]) {
      if (key === menu) {
        return obj[item][key];
      }
    }
  }
};
