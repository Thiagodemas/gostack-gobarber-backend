import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRespository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRespository);
    const appointments = await appointmentsRepository.find();
    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);
        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({
            date: parsedDate,
            provider_id,
        });
        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.massage });
    }
});

export default appointmentsRouter;
