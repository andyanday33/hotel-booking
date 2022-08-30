import { prisma } from "../prisma";
/**
 * Helper function which returns filtered data from prisma.
 *
 * @param query Api Request Query.
 */
export default async function queryAPI(
  query: Partial<{
    [key: string]: string | string[];
  }>
) {
  let whereQueryOptions = {};
  if (query.location) {
    whereQueryOptions = {
      address: {
        contains: query.location,
      },
      ...whereQueryOptions,
    };
  }
  return prisma.room.findMany({
    where: whereQueryOptions,
  });
}
