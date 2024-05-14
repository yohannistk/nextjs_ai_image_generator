import { z } from "zod";

export const inputSchema = z.object({
  width: z.number().min(64).max(1024),
  height: z.number().min(64).max(1024),
  refine: z.string().optional(),
  negative_prompt: z.string().optional(),
  prompt: z.string().min(10),
  apply_watermark: z.boolean().optional(),
  num_inference_steps: z.number().min(1).max(500),
});
