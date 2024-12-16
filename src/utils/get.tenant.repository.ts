export default async function getTenantRepository<T>(tenantId: string, entity: new () => T, getTenantDataSource) {
const tenantDataSource = await getTenantDataSource(tenantId);
return tenantDataSource.getRepository(entity);
}