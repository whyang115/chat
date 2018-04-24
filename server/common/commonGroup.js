const Group = require("../model/group");

const initCommonGroup = async () => {
  let res = await Group.findOne({ name: "全体群" });
  if (res) {
    return;
  }
  try {
    let commonGroup = new Group({ name: "全体群" });
    await commonGroup.save();
  } catch (error) {
    console.log(error);
  }
};
module.exports = { initCommonGroup };
