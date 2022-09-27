import * as express from 'express'
import {Request, Response} from 'express'
import * as cors from 'cors'
import {createConnection} from 'typeorm'
import {Product} from "./entity/product";
import {Complaint} from "./entity/complaint";
import * as amqp from 'amqplib/callback_api';


createConnection().then(db => {

const app = express()
app.use(cors())

amqp.connect('amqp://localhost', (error0, connection) => {
    
        console.log("Creating AMQP Connection-1");
        
        if (error0) {
            console.log("amqp error");
            throw error0
        }

        console.log("Creating AMQP Connection-2");
        
        connection.createChannel((error1, channel) => {

            if (error1) {
                console.log("amqp error-2");    
                process.on('beforeExit', () => {
                    console.log('closing')
                    connection.close()
                })
                connection.close()
                throw error1
            }

            console.log("Creating AMQP Connection-3");
        
            const productRepository = db.getRepository(Product);
            const complaintRepository = db.getRepository(Complaint);
            //amqp://guest:guest@localhost:15672
                console.log("Creating DB Connection");

                app.use(express.json())
                app.use(express.urlencoded({ extended: true }));


                app.get('/', async (req: Request, res: Response) => {
                    return res.json( {
                        "result": "success"
                    })
                })
            

                app.get('/api/products1', async function (req, res)  {
                    const products =  await productRepository.find();
                    console.log(products);
                    return res.json( products);
                })
                
                app.get('/api/products', async function (req, res)  {
                    console.log("------------senthil-----------");
                    const products =  await productRepository.find();
                    console.log(products);
                    return res.json( products);
                })

                app.post('/api/products', async (req, res) =>  {
                    console.log("Post Request")
                    console.log(req.body)
                    console.log(req.params)
                    
                    const product = await  productRepository.create(req.body);
                    console.log('product')
                    console.log(product)
                    
                    const result =  await productRepository.save(product)
                    console.log('result')
                    console.log(result)

                    channel.sendToQueue('product_created_1', Buffer.from(JSON.stringify(result)));
                    return res.send(product)
                })


                app.post('/api/product', async (req, res) =>  {
                    console.log("Post Request");
                    console.log("Post body");
                    console.log(req.body);

                    console.log("Post req params");
                    console.log(req.params);
                    
                    console.log("Post req body");
                    console.log(req.body);

                    const product = await  productRepository.create(req.body);
                    console.log('product');
                    console.log(product);
                    
                    const result =  await productRepository.save(product)
                    console.log('result')
                    console.log(result)

                    channel.sendToQueue('product_created_1', 
                    Buffer.from(JSON.stringify(result)));
                    return res.send(product)
                })



                app.get('/api/products/:id',  async function(req, res)   {
                    console.log(req.params['id'])
                    console.log(req.params.id)
                    const product = await productRepository.findOne(
                        {
                            where : { id: Number.parseInt(req.params.id) , },
                        }
                    );
                    console.log(product);
                    return res.json(product);
                })

                app.get('/api/product/:id',  async function(req, res)   {
                    console.log(req.params['id'])
                    console.log(req.params.id)
                    const product = await productRepository.findOne(
                        {
                            where : { id: Number.parseInt(req.params.id) , },
                        }
                    );
                    console.log(product);
                    return res.json(product);
                })

                
                app.put('/api/products/:id', async function(req, res)  {
                    const product = await productRepository.findOne({
                        where : { id: Number.parseInt(req.params.id) , },
                    })
                    productRepository.merge(product, req.body)
                    const result = await productRepository.save(product)
                    channel.sendToQueue('product_updated_1', Buffer.from(JSON.stringify(product)))
                    return res.send(result)
                });

                app.delete('/api/products/:id', async (req: Request, res: Response) => {
                    const result = await productRepository.delete(req.params.id);
                    channel.sendToQueue('product_deleted_1', Buffer.from(req.params.id));
                    return res.send(result);
                })

                app.delete('/api/product/:id', async (req: Request, res: Response) => {
                    const result = await productRepository.delete(req.params.id);
                    channel.sendToQueue('product_deleted_1', Buffer.from(req.params.id));
                    return res.send(result);
                })


                app.post('/api/products/:id/like', async function(req, res)  {
                    const product = await productRepository.findOne({ 
                        where: { id: Number.parseInt(req.params.id) }
                    }) 
                    product.likes++
                    const result = await productRepository.save(product)
                    channel.sendToQueue('product_updated_1', Buffer.from(JSON.stringify(product)))
                    return res.send(result)
                })

                app.post('/api/product/:id/like', async function(req, res)  {
                    const product = await productRepository.findOne({ 
                        where: { id: Number.parseInt(req.params.id) }
                    }) 
                    product.likes++
                    const result = await productRepository.save(product)
                    channel.sendToQueue('product_updated_1', Buffer.from(JSON.stringify(product)))
                    return res.send(result)
                })

                app.get('/api/complaint', async function (req, res)  {
                    console.log("------------senthil-----------");
                    const complaints =  await complaintRepository.find();
                    console.log(complaints);
                    return res.json(complaints);
                })

                app.get('/api/complaints', async function (req, res)  {
                    console.log("------------senthil-----------");
                    const complaints =  await complaintRepository.find();
                    console.log(complaints);
                    return res.json(complaints);
                })

                app.get('/api/complaints_today', async function (req, res)  {
                    console.log("------------senthil-----------");
                    const complaints =  await complaintRepository.find( {       
                            where : { 
                                complaintDate: new Date(
                                    new Date().getFullYear(), 
                                    new Date().getMonth(), 
                                    new Date().getDate() 
                                ) , },
                        }
                    );
                    console.log(complaints);
                    return res.json(complaints);
                })

                app.post('/api/complaints', async (req, res) =>  {
                    console.log("Complaints Post Request")
                    console.log(req.body)
                    console.log(req.params)
                    
                    const complaints = await  complaintRepository.create(req.body);
                    console.log('complaints')
                    console.log(complaints)
                    
                    const result =  await complaintRepository.save(complaints)
                    console.log('result')
                    console.log(result)

                    channel.sendToQueue('complaints_created_1', Buffer.from(JSON.stringify(result)));
                    return res.send(complaints)
                })


                app.post('/api/complaint', async (req, res) =>  {
                    console.log("Complaint Post Request");
                    console.log("Post body");
                    console.log(req.body);

                    console.log("Post req params");
                    console.log(req.params);
                    
                    console.log("Post req body");
                    console.log(req.body);

                    const complaint = await  complaintRepository.create(req.body);
                    console.log('complaint');
                    console.log(complaint);
                    
                    const result =  await complaintRepository.save(complaint)
                    console.log('result')
                    console.log(result)

                    channel.sendToQueue('complaint_created_1', 
                    Buffer.from(JSON.stringify(result)));
                    return res.send(complaint)
                })


                app.get('/api/complaints/:id',  async function(req, res)   {
                    console.log(req.params['id'])
                    console.log(req.params.id)
                    const complaint = await complaintRepository.findOne(
                        {
                            where : { id: Number.parseInt(req.params.id) , },
                        }
                    );
                    console.log(complaint);
                    return res.json(complaint);
                })

                app.get('/api/complaint/:id',  async function(req, res)   {
                    console.log(req.params['id'])
                    console.log(req.params.id)
                    const complaint = await complaintRepository.findOne(
                        {
                            where : { id: Number.parseInt(req.params.id) , },
                        }
                    );
                    console.log(complaint);
                    return res.json(complaint);
                })

                
                app.put('/api/complaints/:id', async function(req, res)  {
                    const complaint = await complaintRepository.findOne({
                        where : { id: Number.parseInt(req.params.id) , },
                    })
                    complaintRepository.merge(complaint, req.body)
                    const result = await complaintRepository.save(complaint)
                    channel.sendToQueue('complaint_updated_1', 
                    Buffer.from(JSON.stringify(complaint)))
                    return res.send(result)
                });

                                
                app.put('/api/complaint/:id', async function(req, res)  {
                    const complaint = await complaintRepository.findOne({
                        where : { id: Number.parseInt(req.params.id) , },
                    })
                    complaintRepository.merge(complaint, req.body)
                    const result = await complaintRepository.save(complaint)
                    channel.sendToQueue('complaint_updated_1', 
                    Buffer.from(JSON.stringify(complaint)))
                    return res.send(result)
                });

                app.delete('/api/complaints/:id', async (req: Request, res: Response) => {
                    const result = await complaintRepository.delete(req.params.id);
                    channel.sendToQueue('complaint_deleted_1', Buffer.from(req.params.id));
                    return res.send(result);
                })

                app.delete('/api/complaint/:id', async (req: Request, res: Response) => {
                    const result = await complaintRepository.delete(req.params.id);
                    channel.sendToQueue('complaint_deleted_1', Buffer.from(req.params.id));
                    return res.send(result);
                })


		app.use(cors())

                console.log("listening on 3322")
                app.listen(3322)

                process.on('beforeExit', () => {
                    console.log('closing')
                    connection.close()
                })

        })

    })

})