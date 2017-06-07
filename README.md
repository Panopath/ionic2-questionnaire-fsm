# ionic2-questionnaire-fsm

Messy code, to clean up later.

Complex multi-step questionnaire with **JSON-defined** finite-state-machine schema.

Capabilities:

* Next step, previous step (full history support)
* Full branching support
* Setting variables based on previous answers
* Determining next questions based on variables
* Multiple choices/single choice support
* etc. option with text input
* Using mixins to define JSON more efficiently

```json
{
  "initial": "1",
  "questions": {
    "1": {
      "text": "你想留学哪一个国家？（多选）",
      "multiple": true,
      "options": [
        {
          "text": "美国",
          "value": "美国",
          "next": "2",
          "setvar": [
            {
              "key": "is_global",
              "value": false
            }
          ]
        },
        {
          "text": "英国",
          "value": "英国",
          "next": "2",
          "setvar": [
            {
              "key": "is_global",
              "value": true
            }
          ]
        },
        {
          "text": "加拿大",
          "value": "加拿大",
          "next": "2",
          "setvar": [
            {
              "key": "is_global",
              "value": true
            }
          ]
        },
        {
          "text": "澳大利亚",
          "value": "澳大利亚",
          "next": "2",
          "setvar": [
            {
              "key": "is_global",
              "value": true
            }
          ]
        },
        {
          "text": "其他",
          "value": "其他",
          "isEtc": true,
          "next": "2",
          "setvar": [
            {
              "key": "is_global",
              "value": true
            }
          ]
        }
      ]
    },
    "2": {
      "text": "你是？",
      "options": [
        {
          "text": "在校生",
          "value": "在校生",
          "next": "result.app"
        },
        {
          "text": "申请生",
          "value": "申请生",
          "next": "3.1",
          "setvar": [
            {
              "key": "is_parent",
              "value": false
            }
          ]
        },
        {
          "text": "家长",
          "value": "家长",
          "next": "3.2",
          "setvar": [
            {
              "key": "is_parent",
              "value": true
            }
          ]
        },
        {
          "text": "留学机构从业人员",
          "value": "留学机构从业人员",
          "next": "result.congye"
        }
      ]
    },
    "3.1": {
      "text": "你在哪个地方读书？",
      "@mixin": "place"
    },
    "3.2": {
      "text": "你的孩子在哪个地方读书？",
      "@mixin": "place"
    },
    "4.1": {
      "text": "你是哪一届毕业生？",
      "@mixin": "grade"
    },
    "4.2": {
      "text": "你的孩子是哪一届？",
      "@mixin": "grade"
    }
  },
  "mixins": {
    "goto_4": {
      "conditionals": [
        [
          "$is_parent==true",
          "4.2"
        ],
        [
          "true",
          "4.1"
        ]

      ]
    },
    "place": {
      "options": [
        {
          "text": "上海",
          "value": "上海",
          "setvar": [
            {
              "key": "loc",
              "value": 1
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "北京",
          "value": "北京",
          "setvar": [
            {
              "key": "loc",
              "value": 2
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "江苏",
          "value": "江苏",
          "setvar": [
            {
              "key": "loc",
              "value": 3
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "山东",
          "value": "山东",
          "setvar": [
            {
              "key": "loc",
              "value": 4
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "安徽",
          "value": "安徽",
          "setvar": [
            {
              "key": "loc",
              "value": 3
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "浙江",
          "value": "浙江",
          "setvar": [
            {
              "key": "loc",
              "value": 3
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "天津",
          "value": "天津",
          "setvar": [
            {
              "key": "loc",
              "value": 4
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "河北",
          "value": "河北",
          "setvar": [
            {
              "key": "loc",
              "value": 4
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "山西",
          "value": "山西",
          "setvar": [
            {
              "key": "loc",
              "value": 4
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "内蒙古",
          "value": "内蒙古",
          "setvar": [
            {
              "key": "loc",
              "value": 4
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "辽宁",
          "value": "辽宁",
          "setvar": [
            {
              "key": "loc",
              "value": 5
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "吉林",
          "value": "吉林",
          "setvar": [
            {
              "key": "loc",
              "value": 5
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "黑龙江",
          "value": "黑龙江",
          "setvar": [
            {
              "key": "loc",
              "value": 5
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "四川",
          "value": "四川",
          "setvar": [
            {
              "key": "loc",
              "value": 6
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "云南",
          "value": "云南",
          "setvar": [
            {
              "key": "loc",
              "value": 6
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "贵州",
          "value": "贵州",
          "setvar": [
            {
              "key": "loc",
              "value": 6
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "西藏",
          "value": "西藏",
          "setvar": [
            {
              "key": "loc",
              "value": 6
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "重庆",
          "value": "重庆",
          "setvar": [
            {
              "key": "loc",
              "value": 6
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "陕西",
          "value": "陕西",
          "setvar": [
            {
              "key": "loc",
              "value": 6
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "甘肃",
          "value": "甘肃",
          "setvar": [
            {
              "key": "loc",
              "value": 6
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "青海",
          "value": "青海",
          "setvar": [
            {
              "key": "loc",
              "value": 6
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "宁夏",
          "value": "宁夏",
          "setvar": [
            {
              "key": "loc",
              "value": 6
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "新疆",
          "value": "新疆",
          "setvar": [
            {
              "key": "loc",
              "value": 6
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "广东",
          "value": "广东",
          "setvar": [
            {
              "key": "loc",
              "value": 7
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "海南",
          "value": "海南",
          "setvar": [
            {
              "key": "loc",
              "value": 7
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "广西",
          "value": "广西",
          "setvar": [
            {
              "key": "loc",
              "value": 7
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "台湾",
          "value": "台湾",
          "setvar": [
            {
              "key": "loc",
              "value": 7
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "香港",
          "value": "香港",
          "setvar": [
            {
              "key": "loc",
              "value": 7
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "澳门",
          "value": "澳门",
          "setvar": [
            {
              "key": "loc",
              "value": 7
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "福建",
          "value": "福建",
          "setvar": [
            {
              "key": "loc",
              "value": 7
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "河南省",
          "value": "河南省",
          "setvar": [
            {
              "key": "loc",
              "value": 8
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "湖北省",
          "value": "湖北省",
          "setvar": [
            {
              "key": "loc",
              "value": 8
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "湖南省",
          "value": "湖南省",
          "setvar": [
            {
              "key": "loc",
              "value": 8
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "江西",
          "value": "江西",
          "setvar": [
            {
              "key": "loc",
              "value": 8
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "新加坡",
          "value": "新加坡",
          "setvar": [
            {
              "key": "loc",
              "value": 9
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        },
        {
          "text": "美国",
          "value": "美国",
          "setvar": [
            {
              "key": "loc",
              "value": 10
            }
          ],
          "next": {
            "@mixin": "goto_4"
          }
        }
      ]
    },
    "grade": {
      "options": [
        {
          "text": "2017",
          "value": "2017",
          "setvar": [
            {
              "key": "grade",
              "value": 2017
            }
          ],
          "next": "result.done"
        },
        {
          "text": "2018",
          "value": "2018",
          "setvar": [
            {
              "key": "grade",
              "value": 2018
            }
          ],
          "next": "result.done"
        },
        {
          "text": "2019",
          "value": "2019",
          "setvar": [
            {
              "key": "grade",
              "value": 2019
            }
          ],
          "next": "result.done"
        },
        {
          "text": "2020",
          "value": "2020",
          "setvar": [
            {
              "key": "grade",
              "value": 2020
            }
          ],
          "next": "result.done"
        },
        {
          "text": "2021",
          "value": "2021",
          "setvar": [
            {
              "key": "grade",
              "value": 2021
            }
          ],
          "next": "result.done"
        },
        {
          "text": "2022",
          "value": "2022",
          "setvar": [
            {
              "key": "grade",
              "value": 2022
            }
          ],
          "next": "result.done"
        },
        {
          "text": "其他",
          "value": "其他",
          "isEtc": true,
          "next": "result.done"
        }
      ]
    }
  }
}
```
