//find out active userss
[
    {
      $match: {
        isActive: true,
      },
    },
    {
      $count: 'activeUsers'
    }
  ]


  //finding out the average  faourite fruit by users

  [
    {
      $group: {
        _id: "$favoriteFruit",
       count:{
         $sum:1
       }
      },
    },
    {
      $sort: {
        count: -1
      }
    },
    {
      $limit: 5
    }
  ]

  // counting number of males and females

  [
    {
      $group: {
        _id: "$gender",
        count: {
          $sum: 1
        }
      }
    }
  ]

  //finding user based on country

  [
    {
      $group: {
        _id: "$company.location.country",
        basedOnCountry: {
          $sum: 1
        }
      }
    },
    {
      $sort: {
        basedOnCountry: -1
      }
    },
    {
      $limit: 2
    }
  ]

  //list all unique eye color in data

  [
    {
      $group: {
        _id: "$eyeColor",
        uniqueEyeColor: {
          $sum: 1
        }
      }
    },
    {
      $sort: {
        uniqueEyeColor: -1
      }
    }
  ]


  //average number of tag per user

  // approach 1


  [
    {
      $unwind:"$tags"
    },
    {
      $group: {
        _id: "$_id",
        countTags: {
          $sum: 1
        }
      }
    },
    {
      $group: {
        _id: null,
        average: {
          $avg: "$countTags"
        }
      }
    },
   
  ]


  // approach 2

  [
    {
      $addFields: {
        numberOfTags: {
          $size: {
            $ifNull: [
              "$tags",
              []
            ]
          }
        }
      }
    },
    {
      $group: {
        _id: null,
        averageNoOfTags: {
          $avg: "$numberOfTags"
        }
      }
    }
  ]

  //how many users have enum as one of their tags

  [
    {
      $match: {
        tags:"enim"
      }
    },
    {
      $count: 'userWithEnimTag'
    }
  ]

  // what are the name and age of usetrs  who are inactive and velit as a tag
  [
    {
      $match: {
        isActive: false,
        tags: "velit",
      },
    },
    {
      $project: {
        name:1,
        age:1
      }
    }
  ]

  //how many user's have +1 (940)  regex
  
  [
    {
      $match: {
        "company.phone": {
          $regex: /\+1 \(940\)/
        }
      }
    },
    {
      $count: 'userWithPhone'
    }
  ]

  // who has registered most recently

  [
    {
      $sort: {
        registered: -1
      }
    },
    {
      $limit: 4
    },
    {
      $project: {
        name:1,
        registered:1,
        age:1,
        favoriteFruit:1
      }
    }
  ]

  //categorized user by their favourite fruit
  [
    {
      $group: {
        _id: "$favoriteFruit",
        users: {
          $push: "$name"  
        }
      }
    }
  ]

  //how many users have ad as their second tags 
  [
    {
      $match: {
        "tags.1":"ad"
      }
    },
    {
      $count: 'userWithSecondTag'
    }
  ]

  // find users with both enim and id in their tags
  [
    {
      $match: {
        tags: {
          $all: ["enim","id"]
        }
      }
    },
    {
      $count: 'userWithBothTags'
    }
  ]

  //list all comoany located in usa with usercount

  [
    {
      $match: {
        "company.location.country":"USA"
      }
    },
    {
      $group: {
        _id: "$company.title",
        userCount: {
          $sum: 1
        }
      }
    }
  ]




