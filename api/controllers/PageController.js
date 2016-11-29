/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	dev: (req,res) => {
	  res.view('template/page/dev');
  },
  user: (req,res) => {
    res.view('template/page/user');
  }
};

