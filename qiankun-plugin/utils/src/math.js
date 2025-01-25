/**
 * 查找指定元素下标
 * @param data 需要查找的数组 
 * @param find 需要查找的元素
 * @returns 返回找到元素的下标，否则返回 -1
 */
export function indexOf(data, find) {
    const len = data.length;
    for (let i = 0; i < len; i++) {
        if (data[i] === find) {
            return i;
        }
    }
    return -1;
}

