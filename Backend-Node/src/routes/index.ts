import {Router} from "express";
import bookRoutes from "./book.routes";
import readerRoutes from "./reader.routes";
import lendingRoutes from "./lending.routes";
import authRoutes from "./auth.routes";
import notificationRouter from "./notification.routes";
import auditRoutes from "./audit.routes";

const rootRoutes = Router();

rootRoutes.use('/books', bookRoutes);
rootRoutes.use('/readers', readerRoutes);
rootRoutes.use('/lending', lendingRoutes);
rootRoutes.use('/auth', authRoutes);
rootRoutes.use('/notifications', notificationRouter);
rootRoutes.use('/audit', auditRoutes)

export default rootRoutes;