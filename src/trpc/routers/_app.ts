import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { ministerOfficeRouter } from './minister-office';

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),

  // مكتب الوزير - جميع العمليات المتعلقة بالوزارة
  ministerOffice: ministerOfficeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;