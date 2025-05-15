const getUserModel = require('../models/GetData.js');

const GetAllUser = async (req, res) => {
  console.log('req------>', req.query)
  const { limit, offset } = req.query
  try {
    const { users, totalcnt, pagelist } = await getUserModel.getAllUser({ limit: limit, offset: offset })

    if (!users) {
      return res.status(200).json({ success: true, message: 'NO Data Found', users: [] });
    }
    else {
      return res.status(200).json({
        success: true,
        message: 'Data Fetched Succesfully',
        totalUser: totalcnt,
        user: users,
        pagelist: pagelist
      })
    }
  }
  catch (err) {
    return res.status(500).json({ success: false, message: 'Error' })
  }
}

module.exports = { GetAllUser }