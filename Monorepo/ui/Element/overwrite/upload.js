/*
 * 上传组件
 */
import { Upload, Message } from 'element-ui';

export default function () {

    // 上传文件 增加 Hash 值
    Upload.components.Upload.methods.post = function(rawFile) {
        // 文件名称
        let fileName = rawFile.name;

        // start
        console.time(fileName);

        // 计算 Hash
        md5Hash(rawFile).then((hash) => {
            const { uid } = rawFile;

            // end
            console.timeEnd(fileName);

            // 打印 Hash
            console.log(rawFile.name, 'Hash 值：', hash);

            // 获取请求头
            let tempHaeders = this.headers;

            tempHaeders['X-Request-Hash'] = hash;

            console.log(tempHaeders, '<- tempHaeders');

            // header需要被重置;
            const options = {
                headers: tempHaeders, // this.headers,
                withCredentials: this.withCredentials,
                file: rawFile,
                data: this.data,
                filename: this.name,
                action: this.action,
                onProgress: e => {
                    this.onProgress(e, rawFile);
                },
                onSuccess: res => {
                    this.onSuccess(res, rawFile);
                    delete this.reqs[uid];
                },
                onError: err => {
                    this.onError(err, rawFile);
                    delete this.reqs[uid];
                }
            };
            const req = this.httpRequest(options);
            this.reqs[uid] = req;
            if (req && req.then) {
                req.then(options.onSuccess, options.onError);
            }
        });
    };

    Upload.components.Upload.methods.handleChange = function(ev) {
        // 获取 文件
        const files = ev.target.files;

        if (!files) {
            return false;
        };

        // 设置默认上传文件大小限制为 2 G
        const MAX_FILE_SIZE = 1024 * 1024 * 1024 * 2;

        // 获取 文件大小
        let fileSize = files[0].size;
        // xxx
        if (fileSize > MAX_FILE_SIZE) {
            Message({
                message: `文件大小超过 ${MAX_FILE_SIZE / 1024 / 1024} MB 限制，请重新上传`,
                type: 'error',
                duration: 3000
            });
            // 阻止
            return false;
        }

        // 上传文件
        this.uploadFiles(files);
    };

    /**
     * @description: MD5 计算文件 hash
     * @author: M.yunlong
     * @date: 2023-04-21 14:14:57
    */
    const md5Hash = function (file) {
        return new Promise((resolve, reject) => {
            // 是否 正在执行
            var running = false;
            // 防止 重复计算
            if (running) {
                return false;
            }
            // 文件读取
            let fileReader = new FileReader();
            // 二进制 分割
            let blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice;
            // 分片大小 100M
            let chunkSize = 1024 * 1024 * 100;
            // read in chunks of 2MB
            let chunks = Math.ceil(file.size / chunkSize);
            // 初始值
            let currentChunk = 0;
            // MD5
            let spark = new window.SparkMD5();

            // 文件准备
            fileReader.onload = function (e) {
                // 开始计算
                spark.appendBinary(e.target.result);
                // append binary string
                currentChunk++;
                // 递归
                if (currentChunk < chunks) {
                    loadNext();
                } else {
                    // 解锁
                    running = false;
                    // xx
                    let md = spark.end();
                    // 抛出
                    resolve(md);
                }
            };

            // 异常
            fileReader.onerror = function() {
                running = false;
                console.log('something went wrong');
            };
            function loadNext () {
                let start = currentChunk * chunkSize;
                let end = start + chunkSize >= file.size ? file.size : start + chunkSize;
                // xxx
                console.log('计算中...', file, start, end);
                // 计算
                fileReader.readAsBinaryString(blobSlice.call(file, start, end));
            }
            // 加锁
            running = true;
            // 执行
            loadNext();
        });
    };
};
