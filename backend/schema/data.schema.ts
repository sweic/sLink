import { z } from "zod";

export const fetchDataSchema = z.object({
  username: z.string(),
  version: z.number(),
});

export const updateNodesSchema = z.object({
  username: z.string(),
  version: z.number(),
  nodes: z.array(
    z.object({
      id: z.string(),
      link: z.string(),
      name: z.string(),
      imageURL: z.string().nullish(),
    })
  ),
});

export const updateInfoSchema = z.object({
  username: z.string(),
  imageURL: z.string(),
  title: z.string(),
  description: z.string(),
  version: z.number(),
});
