exports.getList = (req,res)=>{
  res.ssend([{
    "icon": "HomeOutlined",
    "title": "首页",
    "path": "/home/index"
  }, {
    "icon": "UserOutlined",
    "title": "学员管理",
    "path": "/student",
    "children": [{
        "icon": "TableOutlined",
        "path": "/student/list",
        "title": "学员列表"
      }

    ]
  }, {
    "icon": "IdcardOutlined",
    "title": "教练管理",
    "path": "/coach",
    "children": [{
      "icon": "TableOutlined",
      "path": "/coach/list",
      "title": "教练列表"
    }]
  }, {
    "icon": "ContainerOutlined",
    "title": "课程管理",
    "path": "/course",
    "children": [{
      "icon": "ReadOutlined",
      "path": "/course/arrange",
      "title": "课程安排"
    }, ]
  }, {
    "icon": "AccountBookOutlined",
    "title": "考试管理",
    "path": "/exam",
    "children": [{
      "icon": "ScheduleOutlined",
      "path": "/exam/plan",
      "title": "考试安排"
    }, {
        "icon": "ReconciliationOutlined",
        "path": "/exam/record",
        "title": "考试记录"
      }]
  }, {
    "icon": "FundOutlined",
    "title": "数据统计",
    "path": "/dashboard/dataVisualize",
  }])
}