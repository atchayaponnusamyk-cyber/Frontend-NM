const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// CORS fix
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

server.use(middlewares);
server.use(jsonServer.bodyParser);

// LOGIN endpoint
server.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = router.db;
  const user = db.get('users').find({ email, password }).value();
  if (user) {
    res.json({
      token: 'fake-jwt-token-' + user.id,
      role: user.role,
      name: user.name,
      id: user.id
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// REGISTER endpoint
server.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  const db = router.db;
  const existing = db.get('users').find({ email }).value();
  if (existing) {
    return res.status(400).json({ message: 'Email already exists' });
  }
  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    role: 'USER'
  };
  db.get('users').push(newUser).write();
  res.json({ message: 'Registration successful' });
});

// GET my complaints
server.get('/api/complaints/my', (req, res) => {
  const db = router.db;
  const complaints = db.get('complaints').value();
  res.json(complaints);
});

// GET complaint by id
server.get('/api/complaints/:id', (req, res) => {
  const db = router.db;
  const complaint = db.get('complaints').find({ id: parseInt(req.params.id) }).value();
  if (complaint) {
    res.json(complaint);
  } else {
    res.status(404).json({ message: 'Complaint not found' });
  }
});

// SUBMIT complaint
server.post('/api/complaints', (req, res) => {
  const db = router.db;
  const newComplaint = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    status: 'OPEN',
    userId: 1,
    staffId: null,
    assignedStaff: null,
    createdAt: new Date().toISOString(),
    updates: [],
    feedback: null
  };
  db.get('complaints').push(newComplaint).write();
  res.json(newComplaint);
});

// GET all complaints (admin)
server.get('/api/admin/complaints', (req, res) => {
  const db = router.db;
  const complaints = db.get('complaints').value();
  res.json(complaints);
});

// ASSIGN complaint (admin)
server.put('/api/admin/complaints/:id/assign', (req, res) => {
  const db = router.db;
  const { staffId } = req.body;
  const staff = db.get('staff').find({ id: parseInt(staffId) }).value();
  db.get('complaints')
    .find({ id: parseInt(req.params.id) })
    .assign({
      status: 'ASSIGNED',
      staffId: parseInt(staffId),
      assignedStaff: staff ? staff.name : 'Staff'
    })
    .write();
  res.json({ message: 'Assigned successfully' });
});

// GET all staff (admin)
server.get('/api/admin/staff', (req, res) => {
  const db = router.db;
  const staff = db.get('staff').value();
  res.json(staff);
});

// GET assigned complaints (staff)
server.get('/api/staff/complaints', (req, res) => {
  const db = router.db;
  const complaints = db.get('complaints').filter({ staffId: 3 }).value();
  res.json(complaints);
});

// UPDATE complaint status (staff)
server.put('/api/staff/complaints/:id/status', (req, res) => {
  const db = router.db;
  const { status, message } = req.body;
  const complaint = db.get('complaints').find({ id: parseInt(req.params.id) }).value();
  const updates = complaint.updates || [];
  updates.push({
    message: message,
    timestamp: new Date().toISOString()
  });
  db.get('complaints')
    .find({ id: parseInt(req.params.id) })
    .assign({ status, updates })
    .write();
  res.json({ message: 'Updated successfully' });
});

// SUBMIT feedback
server.post('/api/feedback/:complaintId', (req, res) => {
  const db = router.db;
  db.get('complaints')
    .find({ id: parseInt(req.params.complaintId) })
    .assign({
      status: 'CLOSED',
      feedback: req.body
    })
    .write();
  res.json({ message: 'Feedback submitted successfully' });
});

server.use(router);
server.listen(8080, () => {
  console.log('JSON Server running at http://localhost:8080');
});