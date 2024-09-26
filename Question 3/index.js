db.sales.aggregate([
  
    {
      $unwind: "$items"
    },    
  
    {
      $addFields: {
        month: {
          $dateToString: { format: "%Y-%m", date: "$date" } 
        }
      }
    },
    
    
    {
      $group: {
        _id: {
          store: "$store",
          month: "$month"
        },
        totalRevenue: {
          $sum: { $multiply: ["$items.quantity", "$items.price"] } 
        },
        totalPriceSum: {
          $sum: "$items.price" 
        },
        itemCount: {
          $sum: 1 
        }
      }
    },    
   
    {
      $project: {
        _id: 0, 
        store: "$_id.store",
        month: "$_id.month",
        totalRevenue: 1,
        averagePrice: {
          $divide: ["$totalPriceSum", "$itemCount"] 
        }
      }
    },
    
    
    {
      $sort: {
        store: 1,
        month: 1
      }
    }
  ]);
  