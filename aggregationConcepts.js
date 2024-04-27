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