const {app, BrowserWindow, ipcMain} = require('electron')
const nodemailer = require('nodemailer');
const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(50);
    const url = require("url");
    const path = require("path");
    const fs = require('fs');
    


    const sqlite3 = require('sqlite3').verbose();
    const dbPath = path.resolve(__dirname, 'mydb.sqlite')

    const db = new sqlite3.Database(dbPath);

    var knex = require('knex')({
      client: 'sqlite3',
      connection: {
        filename: path.join(__dirname, `mydb.sqlite`)
      }
    });

    let mainWindow;

    function createWindow () {
      mainWindow = new BrowserWindow({
        show:false,
        webPreferences: {
          nodeIntegration: true
        },
      
    
  
   

      })

      mainWindow.maximize();
      mainWindow.show();
  
      mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, `/dist/index.html`),
          protocol: "file:",
          slashes: true
        })
      );
     
      // mainWindow.show();
      // Open the DevTools.
      mainWindow.webContents.openDevTools();

      mainWindow.on('closed', function () {
        mainWindow = null
      })

      mainWindow.removeMenu();
    
      // ipcMain.on('openModal', (event, arg) => {
      //   db.all('SELECT * FROM User', [], (err, result) => {
      //     if (err) {
      //       event.reply('openModal-reply',err);
      //     } else {
      //       event.reply('openModal-reply',result);
      //     }
      //   })
      // })
      emitter.setMaxListeners(50);

    }

    const gotTheLock = app.requestSingleInstanceLock()
  
if (!gotTheLock) {
  app.quit()
} else {

  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })

  // Create myWindow, load the rest of the app, etc...
  app.on('ready', createWindow);
}

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', function () {
      if (mainWindow === null) createWindow()
    })

   

    ipcMain.on('login', (event, arg) => {
      sql = `SELECT * FROM User Where Name = '`+arg.username+`' AND Password = '`+arg.password+`'`;
      
      db.all(sql, (err, result) => {
        if (err) {
          event.reply('login-reply', err);
        } else {
      
          event.reply('login-reply', result);
        }
      })
  
    })


    ipcMain.on('isuserdata', (event, arg) => {
      sql = `SELECT * FROM User`;
      
      db.all(sql, (err, result) => {
        if (err) {
          event.reply('isuserdata-reply', err);
        } else {
      
          event.reply('isuserdata-reply', result);
        }
      })
  
    })

    ipcMain.on('insertmedicine', (event, arg) => {
      sql = `INSERT INTO medicine(medicinename,batchno,quantity,notiquantity,medicinetype,mrp,price,expiry,pharmacy) VALUES(?,?,?,?,?,?,?,?,?)`;
   
      db.run(sql, [arg.medicinename,arg.batchno,arg.quantity,arg.notiquantity,arg.medicinetype,arg.mrp,arg.price,arg.expiry,arg.pharmacy], (err, result) => {
        if (err) {
          console.log(err);
          event.reply('insertmedi-reply', err);
        } else {
      
          event.reply('insertmedi-reply', result);
        }
      })
  
    })

    ipcMain.on('insertuser', (event, arg) => {
      sql = `INSERT INTO User(Name,Email,Password,company) VALUES(?,?,?,?)`;
   
      db.run(sql, [arg.username,arg.email,arg.password,arg.companyname], (err, result) => {
        if (err) {
          console.log(err);
          event.reply('insertuser-reply', err);
        } else {
      
          event.reply('insertuser-reply', result);
        }
      })
  
    })

    ipcMain.on('tabletdata', (event, arg) => {
      // sql = `SELECT * FROM medicine WHERE medicinetype ='`+arg+`'`;
    sql = `SELECT * FROM medicine ORDER BY id DESC`;
      db.all(sql, [], (err, result) => {
        if (err) {
          console.log(err);
          event.reply('tabletdata-reply', err);
        } else {
  
          event.reply('tabletdata-reply', result);
        }
      })
   
    })

    ipcMain.on('delete-medicine', (event,arg)=>{

      sql = `DELETE FROM medicine WHERE id=?`;
      db.all(sql, [arg], (err, result) => {
        if (err) {
          console.log(err);
          event.reply('deletemedi-reply', err);
        } else {
  
          db.all('SELECT * FROM medicine', [], (err, result) => {
            if (err) {
              console.log(err)
            } else {
              event.reply('deletemedi-reply', result);
            }
          })
        }
      })

    })


    ipcMain.on('editmedicinedata', (event,arg)=>{

      sql = "SELECT * FROM medicine WHERE Id="+arg+"";
      db.all(sql, (err, result) => {
        if (err) {
          console.log(err);
          event.reply('editmedi-reply', err);
        } else {
  
          event.reply('editmedi-reply', result);
        }
      })

    })


  

    ipcMain.on('updatemedicine',(event, arg)=>{
      sql = `UPDATE medicine SET medicinename = '`+arg.medicinename+`', batchno = '`+arg.batchno+`', quantity = '`+arg.quantity+`', notiquantity = '`+arg.notiquantity+`', medicinetype = '`+arg.medicinetype+`', mrp = '`+arg.mrp+`', price = '`+arg.price+`', expiry = '`+arg.expiry+`', pharmacy = '`+arg.pharmacy+`'  WHERE Id = '`+arg.id+`'`;
         db.run(sql, function(err,result6) {
           if (err) {
             return console.log(err.message);
           }
     
         });
       })


       ipcMain.on('updateuser',(event, arg)=>{
        sql = `UPDATE User SET Name = '`+arg.username+`', Email = '`+arg.email+`', Password = '`+arg.password+`', company = '`+arg.company+`' WHERE Id = '`+arg.id+`'`;
           db.run(sql, function(err,result6) {
             if (err) {
               return console.log(err.message);
             }
       
           });
         })

       ipcMain.on('invoicesubmit', (event, arg) => {
        sql = `INSERT INTO customer_invoice(name,address,medicine_id,medicine_name,medicine_quantity,medicine_mrp,total_amount,subtotal,discount,grand_total,date) VALUES(?,?,?,?,?,?,?,?,?,?,?)`;
     
        db.run(sql, [arg.cname,arg.caddress,arg.mid,arg.mname,arg.quantity,arg.price,arg.totalamount,arg.subtotal,arg.discount,arg.grandtotal,arg.date], (err, result) => {
          if (err) {
            console.log(err);
            event.reply('invoicesubmit-reply', err);
          } else {
        
            event.reply('invoicesubmit-reply', result);
          }
        })
    
      })


      ipcMain.on('changequantity', (event, arg) => {
      
     
        sql = `UPDATE medicine SET quantity = '`+arg.qunatity+`'  WHERE Id = '`+arg.id+`'`;
        db.run(sql, function(err,result6) {
          if (err) {
            return console.log(err.message);
          }
    
        });



    
      })


      ipcMain.on('invoicedata', (event, arg) => {
        // sql = `SELECT * FROM medicine WHERE medicinetype ='`+arg+`'`;
      sql = `SELECT * FROM customer_invoice ORDER BY id DESC`;
        db.all(sql, [], (err, result) => {
          if (err) {
            console.log(err);
            event.reply('invoicedata-reply', err);
          } else {
    
            event.reply('invoicedata-reply', result);
          }
        })
    
      })

      ipcMain.on('delete-invoice', (event,arg)=>{

        sql = `DELETE FROM customer_invoice WHERE id=?`;
        db.all(sql, [arg], (err, result) => {
          if (err) {
            console.log(err);
            event.reply('deleteinvoice-reply', err);
          } else {
    
            event.reply('deleteinvoice-reply', result);
          }
        })
  
      })
 
      ipcMain.on('imagetest', (event,arg)=>{
        // console.log(arg.fpath);
        console.log(fs.copyFile(arg.path, path.join(__dirname, `/src/assets/upload/`+arg.fname)));
        fs.copyFile(arg.path, path.join(__dirname, `/src/assets/upload/`+arg.fname), 
        (err) => {
          if (err) throw err;
          // console.log(arg.fname + ' uploaded.');
          // console.log(path.join(__dirname, '/upload/profile'+Math.floor(Math.random() * 10000) + 1 +'.'+arg.fname));
       
      });


      sql = `UPDATE User SET image = '`+arg.fname+`' WHERE Id = '`+arg.id+`'`;
      db.run(sql, function(err,result6) {
        if (err) {
          return console.log(err.message);
        }
  
      });


      })


      ipcMain.on('mail', (event,arg)=>{

       var transporter = 
        nodemailer.createTransport({
        service: 'gmail',
        auth: {
          
        user: 'balmukund1998@gmail.com',
          
        pass: '9926592903'
        }
      });
      
      var mailOptions = {
        
        from: 'balmukund1998@gmail.com',
        
        to: arg.email,
        subject: 'New Password',
        text: 'Your new password is: '+arg.password
      };
      
      transporter.sendMail(mailOptions, 
        function(error, info){
        if (error) {
          console.log(error);
        } else {
      
           
        console.log('Email sent: ' + info.response);
        }
      });

      sql = `UPDATE User SET Password = '`+arg.password+`' WHERE Email = '`+arg.email+`'`;
      db.run(sql, function(err,result6) {
        if (err) {
          return console.log(err.message);
        }
  
      });
      })


  
      

     





    

      

      

  