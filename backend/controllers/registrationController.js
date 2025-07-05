const Registration = require('../models/registration');
const XLSX = require('xlsx');

exports.addRegistration = async (req, res) => {
  const { event_id, name, email, department, year } = req.body;
  try {
    let registration = new Registration({ event_id, name, email, department, year });
    await registration.save();
    res.status(201).json(registration);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getRegistrations = async (req, res) => {
  const { event_id } = req.params;
  try {
    const registrations = await Registration.find({event_id}).populate('event_id');
    
    if (!registrations.length) {
      return res.status(404).send('No registrations found for this event');
    }

    const eventName = registrations[0].event_id.title;
    const data = registrations.map(registration => ({
      Name: registration.name,
      Email: registration.email,
      Department: registration.department,
      Year: registration.year,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');
    
    const safeEventName = eventName.replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `registrations_${safeEventName}.xlsx`;
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    const buffer = XLSX.write(workbook, { type: 'buffer' });
    res.send(buffer);
  } catch (error) {
    res.status(500).send('Server error');
  }
};
