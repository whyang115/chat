const avatarList = [
  "data:image/png;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/…Skj8EL0+O+akCBV5+puT7XnZ2dHT1f7fBx9b8P/T5/Y//2Q==",
  "data:image/png;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/…0Z4yT5Rl88OGcjkVj2mWOX3NO/NNwExIyFuafdTottNn/2Q==",
  "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/…2EmoWvn2d3G5ErxmSZSexC5yffpRRXOpOs1GXVjfuq6P/2Q==",
  "data:image/png;base64,/9j/4gxYSUNDX1BST0ZJTEUAAQEA…zhKenz86y0Dx8j94SJx83gE0/rA3wWhzljGA1cknVZTaqz//Z",
  "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/…O5xgCCt/QacQyb6I8THUsL4gp/cJxz3MH6VPdLd9QFXWZ/9k=",
  "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/…OOBsz7BJqmDaNPanAlcqeNhpTUEpfqNEpl6Eup4IoyfyP/9k=",
  "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/…+s9vP1tf/AB8979bn6eJfduX2ftNdzCV3V/8Aeruv6P8A/9k=",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-5-11/20843510.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-5-11/56355109.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-5-11/80945970.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-5-11/25608972.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-5-11/54744073.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-5-11/65390943.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-5-11/57317864.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-5-11/81187410.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-5-11/79453514.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-5-11/9289247.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-5-11/50856770.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-5-11/26464405.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-5-11/51674884.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-5-11/91757153.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-5-11/83013057.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-5-11/87255596.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-5-11/72728447.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-5-11/75503612.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-5-11/95171797.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-5-11/67947105.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-4-1/42784080.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-4-1/21304024.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-4-1/53755819.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-4-1/1529598.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-4-1/10960232.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-4-1/54370195.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-4-1/13991140.jpg",
  "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-4-1/28433695.jpg"
];

const randomAvatar = () => {
  let random = Math.floor(Math.random() * avatarList.length);
  return avatarList[random];
};

module.exports = randomAvatar;
