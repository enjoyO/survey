package eccrm.base.position.dao.impl;

import com.ycrl.core.HibernateDaoHelper;
import com.ycrl.core.SystemContainer;
import com.ycrl.core.exception.Argument;
import com.ycrl.core.exception.InvalidParamException;
import com.ycrl.core.pager.Pager;
import eccrm.base.employee.domain.Employee;
import eccrm.base.org.dao.OrganizationDao;
import eccrm.base.org.domain.Organization;
import eccrm.base.position.bo.PositionEmpBo;
import eccrm.base.position.dao.PositionDao;
import eccrm.base.position.dao.PositionEmpDao;
import eccrm.base.position.domain.Position;
import eccrm.base.position.domain.PositionEmp;
import eccrm.base.position.vo.PositionEmpVo;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.*;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.*;


/**
 * Generated by chenl on 2014-10-18.
 */

@Repository("positionEmpDao")
public class PositionEmpDaoImpl extends HibernateDaoHelper implements PositionEmpDao {

    public static final String POSITION_EMP_PARAM_FILTER = "POSITION_EMP_PARAM_FILTER";

    @Override
    public String save(PositionEmp positionEmp) {
        return (String) getSession().save(positionEmp);
    }

    @Override
    public void update(PositionEmp positionEmp) {
        getSession().update(positionEmp);
    }

    @Override
    public List<PositionEmp> query(PositionEmpBo bo) {
        Criteria criteria = getDefaultCriteria(bo);
        return criteria.list();
    }

    @Override
    public Long getTotal(PositionEmpBo bo) {
        Criteria criteria = createRowCountsCriteria(PositionEmp.class);
        initCriteria(criteria, bo);
        return (Long) criteria.uniqueResult();
    }


    @Override
    public int deleteById(String id) {
        return getSession().createQuery("delete from PositionEmp where id=?")
                .setParameter(0, id)
                .executeUpdate();
    }

    @Override
    public void delete(String orgId, String positionId, String[] empIds) {
        if (StringUtils.isAnyBlank(orgId, positionId)) {
            throw new InvalidParamException("删除岗位员工时，缺少参数!");
        }
        if (empIds == null || empIds.length < 1) {
            throw new InvalidParamException("删除岗位员工时，没有指定要删除的员工!");
        }
        getSession().createQuery("delete from " + PositionEmp.class.getName() + " pe where pe.orgId=? and pe.positionId=? and pe.empId in(:ids)")
                .setParameter(0, orgId)
                .setParameter(1, positionId)
                .setParameterList("ids", empIds)
                .executeUpdate();
    }

    @Override
    public boolean exists(String orgId, String positionId, String empId) {
        Assert.hasText(orgId, "缺少参数：机构ID!");
        Assert.hasText(positionId, "缺少参数：岗位ID!");
        Assert.hasText(empId, "缺少参数：员工ID!");
        Long total = (Long) createRowCountsCriteria(PositionEmp.class)
                .add(Restrictions.eq("orgId", orgId))
                .add(Restrictions.eq("positionId", positionId))
                .add(Restrictions.eq("empId", empId))
                .uniqueResult();
        return total != null && total > 0;
    }

    @Override
    public List<PositionEmp> findByPositionID(String positionId) {

        Argument.isEmpty(positionId, "查询岗位ID不能为空");
        Criteria criteria = createCriteria(PositionEmp.class);
        criteria.add(Restrictions.eq("position.id", positionId));
        return criteria.list();
    }

    @Override
    public PositionEmp findById(String id) {
        return (PositionEmp) getSession().get(PositionEmp.class, id);
    }

    /**
     * 获得默认的org.hibernate.Criteria对象,并根据bo进行初始化（如果bo为null，则会新建一个空对象）
     * 为了防止新的对象中有数据，建议实体/BO均采用封装类型
     */
    private Criteria getDefaultCriteria(PositionEmpBo bo) {
        Criteria criteria = createCriteria(PositionEmp.class);
        initCriteria(criteria, bo);
        return criteria;
    }

    /**
     * 根据BO初始化org.hibernate.Criteria对象
     * 如果org.hibernate.Criteria为null，则抛出异常
     * 如果BO为null，则新建一个空的对象
     */
    private void initCriteria(Criteria criteria, PositionEmpBo bo) {
        if (criteria == null) {
            throw new IllegalArgumentException("criteria must not be null!");
        }
        if (bo == null) bo = new PositionEmpBo();
        criteria.add(Example.create(bo).enableLike(MatchMode.ANYWHERE).ignoreCase());
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<String> findEmployeeIds(String[] positionIds) {
        if (positionIds == null || positionIds.length < 1) return null;
        return getSession().createQuery("select pe.employee.id from PositionEmp pe where pe.position.id in(:ids)")
                .setParameterList("ids", positionIds)
                .list();
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Employee> queryEmployees(String orgId, String[] positionNames) {
        // 查询岗位名称对应的岗位ID
        // 查询员工id
        String positionHql = "select p.id from " + Position.class.getName() + " p where p.name in(:ids) ";
        String hql = "select e from " + Employee.class.getName() + " e where e.id in(select pe.empId from " + PositionEmp.class.getName() + " pe where pe.positionId in(" + positionHql + ") and pe.orgId=:ordId)";
        return getSession().createQuery(hql)
                .setParameterList("ids", positionNames)
                .setParameter("ordId", orgId)
                .list();
    }


    @Override
    @SuppressWarnings("unchecked")
    public List<PositionEmpVo> queryByEmp(String empId) {
        if (StringUtils.isBlank(empId)) {
            return null;
        }
        return getSession().createQuery("select new " + PositionEmpVo.class.getName() + "(pe.id as id,pe.positionId as positionId,p.name as positionName,pe.orgId as orgId,o.name as orgName) from " + PositionEmp.class.getName() + " pe, " +
                Position.class.getName() + " p ," +
                Organization.class.getName() + " o where pe.orgId=o.id and pe.positionId=p.id and pe.empId=?")
                .setParameter(0, empId)
                .list();
    }

    @Override
    public List<PositionEmp> findPosEmp(String orgId, String positionId) {
        Argument.isEmpty(orgId, "组织机构ID不能为空!");
        Argument.isEmpty(positionId, "岗位名称不能为空!");
        Criteria criteria = createCriteria(PositionEmp.class)
                .add(Restrictions.eq("positionId", positionId))
                .add(Restrictions.eq("orgId", orgId));
        return criteria.list();
    }

    @Override
    @SuppressWarnings("checked")
    public List<String> findEmpIds(String orgId, String positionId) {
        Assert.hasText(orgId, "组织机构岗位:查询机构岗位的员工ID时,组织机构ID不能为空!");
        Assert.hasText(positionId, "组织机构岗位:查询机构岗位的员工ID时,岗位名称不能为空!");
        return createCriteria(PositionEmp.class)
                .setProjection(Projections.distinct(Projections.property("empId")))
                .add(Restrictions.eq("positionId", positionId))
                .add(Restrictions.eq("orgId", orgId))
                .list();
    }

    @Override
    public List<PositionEmp> findPosEmp(String[] orgIds, String[] positionIds) {
        Argument.isNull(orgIds, "组织机构ID不能为空!");
        Argument.isNull(positionIds, "岗位名称不能为空!");
        Criteria criteria = createCriteria(PositionEmp.class)
                .add(Restrictions.in("positionId", positionIds))
                .add(Restrictions.in("orgId", orgIds));
        return criteria.list();
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Employee> queryParentEmployees(String orgId, String positionId) {
        Argument.isEmpty(orgId, "组织机构ID不能为空!");
        Argument.isEmpty(positionId, "岗位ID不能为空!");
        // 查询岗位对应的所有组织
        OrganizationDao organizationDao = SystemContainer.getInstance().getBean(OrganizationDao.class);
        Organization org = organizationDao.findById(orgId);
        String path = org.getPath();
        Session session = getSession();
        List<String> orgIds = session.createQuery("select distinct pe.orgId from " + PositionEmp.class.getName() + " pe where pe.positionId=?")
                .setParameter(0, positionId)
                .list();
        if (orgIds == null || orgIds.isEmpty()) {
            PositionDao positionDao = SystemContainer.getInstance().getBean(PositionDao.class);
            Position position = positionDao.findById(positionId);
            throw new RuntimeException("岗位[" + position.getName() + "]没有对应的组织机构，请与管理员联系!");
        }
        // 查询包含当前组织的所有组织（基于上次查询）
        List<String> newOrgIds = new ArrayList<String>();
        for (String id : orgIds) {
            if (path.contains(id)) {
                newOrgIds.add(id);
            }
        }
        if (newOrgIds.isEmpty()) {
            PositionDao positionDao = SystemContainer.getInstance().getBean(PositionDao.class);
            Position position = positionDao.findById(positionId);
            throw new RuntimeException("没有查询到机构名称为[" + org.getName() + "]，岗位名称为[" + position.getName() + "]对应的上级组织机构!请与管理员联系!");
        }

        // 查询包含原机构的组织下的所有员工
        return session.createQuery("from " + Employee.class.getName() + " e where e.id in(select distinct pe.empId from " + PositionEmp.class.getName() + " pe where pe.orgId in(:ids))")
                .setParameterList("ids", newOrgIds)
                .list();
    }

    @Override
    public boolean isExists(String orgId, String positionId, String rtxId) {
        Argument.isEmpty(orgId, "查询人员组织机构岗位关联关系时,组织机构ID不能为空!");
        Argument.isEmpty(positionId, "查询人员组织机构岗位关联关系时,岗位ID不能为空!");
        Argument.isEmpty(rtxId, "查询人员组织机构岗位关联关系时,员工ID不能为空!");
        long count = (Long) createRowCountsCriteria(PositionEmp.class)
                .add(Restrictions.eq("empId", rtxId))
                .add(Restrictions.eq("positionId", positionId))
                .add(Restrictions.eq("orgId", orgId))
                .uniqueResult();
        return count > 0;
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<String> findPositionIds(String empId) {
        if (StringUtils.isEmpty(empId)) {
            return null;
        }
        return getSession().createCriteria(PositionEmp.class)
                .setProjection(Projections.distinct(Projections.property("positionId")))
                .add(Restrictions.eq("empId", empId))
                .list();
    }


    @Override
    @SuppressWarnings("unchecked")
    public List<String> findOrgParams(String empId) {
        if (StringUtils.isBlank(empId)) {
            return null;
        }
        return getSession().createQuery("select o.busiTypeId from " + Organization.class.getName() + " o where o.id in(" +
                "select pe.orgId from " + PositionEmp.class.getName() + " pe where pe.empId=? and o.busiTypeId is not null)")
                .setParameter(0, empId)
                .list();
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<String> findOrgIds(String empId) {
        if (StringUtils.isBlank(empId)) {
            return null;
        }
        return getSession().createCriteria(PositionEmp.class)
                .setProjection(Projections.property("orgId"))
                .add(Restrictions.eq("empId", empId))
                .list();
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<String> findEmpIds(Collection<String> positionIds, Collection<String> orgIds, Collection<String> paramIds) {
        Session session = getSession();
        Criteria criteria = createCriteria(PositionEmp.class)
                .setProjection(Projections.distinct(Projections.property("empId")));

        String hql = "select distinct pe.empId from " + PositionEmp.class.getName() + " pe where ";

        boolean hasParam = false;
        // 组装hql
        if (positionIds != null && !positionIds.isEmpty()) { // 岗位
            hql += " pe.positionId in(:positionIds) ";
            hasParam = true;
            criteria.add(Restrictions.in("positionId", positionIds));
        }

        if (paramIds != null && !paramIds.isEmpty()) {// 系统
            // 子查询:根据系统查询机构
            if (hasParam) {
                hql += " or ";
            }
            hql += " pe.orgId in(select distinct o.id from " + Organization.class.getName() + " o where o.busiTypeId in(:paramIds)) ";
            hasParam = true;
        }

        if (orgIds != null && !orgIds.isEmpty()) {// 机构
            if (hasParam) {
                hql += " or ";
            }
            hql += " pe.orgId in(:orgIds) ";
            hasParam = true;
        }
        // 如果均为空，则不查询直接返回null的集合
        if (!hasParam) return null;
        // 设置过滤参数的值
        Query query = session.createQuery(hql);
        if (positionIds != null && !positionIds.isEmpty()) {
            query.setParameterList("positionIds", positionIds);
        }
        if (paramIds != null && !paramIds.isEmpty()) {
            query.setParameterList("paramIds", paramIds);
        }
        if (orgIds != null && !orgIds.isEmpty()) {
            query.setParameterList("orgIds", orgIds);
        }
        return query.list();
    }


    @Override
    @SuppressWarnings("unchecked")
    public List<Employee> queryEmployee(String orgId, String positionId) {
        if (StringUtils.isAnyBlank(orgId, positionId)) {
            return null;
        }
        String subHql = "select distinct pe.empId from " + PositionEmp.class.getName() + " pe where pe.orgId=? and pe.positionId=?";
        Query query = getSession().createQuery("from " + Employee.class.getName() + " e where e.id in(" + subHql + ") ")
                .setParameter(0, orgId)
                .setParameter(1, positionId);
        if (Pager.getStart() != null) {
            query.setFirstResult(Pager.getStart());
        }
        if (Pager.getLimit() != null) {
            query.setMaxResults(Pager.getLimit());
        }
        return query.list();

    }

    @Override
    public DetachedCriteria findEmpOrgIds(String empId) {
        Assert.hasText(empId, "查询员工ID所属的组织机构ID时,没有指定员工的ID!");
        return DetachedCriteria.forClass(PositionEmp.class)
                .setProjection(Projections.distinct(Projections.property("orgId")))
                .add(Restrictions.eq("empId", empId));
    }

    @Override
    public DetachedCriteria findEmpPositionIds(String empId) {
        Assert.hasText(empId, "查询员工ID所属的岗位ID时,没有指定员工的ID!");
        return DetachedCriteria.forClass(PositionEmp.class)
                .setProjection(Projections.distinct(Projections.property("positionId")))
                .add(Restrictions.eq("empId", empId));
    }

    @Override
    public DetachedCriteria findEmpParams(String empId) {
        Assert.hasText(empId, "查询员工所属的系统ID时,没有指定员工的ID!");
        return DetachedCriteria.forClass(Organization.class)
                .setProjection(Projections.distinct(Projections.property("busiTypeId")))
                .add(Property.forName("id").in(findEmpOrgIds(empId)));
    }

    @Override
    public DetachedCriteria findEmpPramOrgIds(String empId) {
        Assert.hasText(empId, "查询员工所属的系统的所有机构ID时,没有指定员工的ID!");
        return DetachedCriteria.forClass(Organization.class)
                .setProjection(Projections.distinct(Projections.id()))
                .add(Property.forName("busiTypeId").in(
                        DetachedCriteria.forClass(Organization.class)
                                .setProjection(Projections.distinct(Projections.property("busiTypeId")))
                                .add(Property.forName("id").in(
                                        DetachedCriteria.forClass(PositionEmp.class)
                                                .setProjection(Projections.distinct(Projections.property("orgId")))
                                                .add(Restrictions.eq("empId", empId))
                                ))
                ));
    }

    @Override
    public DetachedCriteria findParamOrgIds(Set<String> paramIds) {
        Assert.isTrue(paramIds != null && !paramIds.isEmpty(), "查询系统对应的机构ID时，没有指定系统!");
        return DetachedCriteria.forClass(Organization.class)
                .setProjection(Projections.distinct(Projections.id()))
                .add(Restrictions.in("busiTypeId", paramIds));
    }

    @Override
    @SuppressWarnings("unchecked")
    public DetachedCriteria findCurrentAndChildOrgIds(String empId) {
        Assert.hasText(empId, "查询员工的组织机构及下级机构ID时,没有指定员工的ID!");
        List<String> orgIds = findEmpOrgIds(empId).getExecutableCriteria(getSession()).list();
        Disjunction disjunction = Restrictions.disjunction();
        if (orgIds == null || orgIds.isEmpty()) {
            // 为空的时候返回一个永远为false的条件
            return DetachedCriteria.forClass(Organization.class)
                    .setProjection(Projections.distinct(Projections.id()))
                    .add(Restrictions.isNull("id"));
        }
        for (String orgId : orgIds) {
            disjunction.add(Restrictions.like("path", "/" + orgId + "/", MatchMode.ANYWHERE));
        }

        return DetachedCriteria.forClass(Organization.class)
                .setProjection(Projections.distinct(Projections.id()))
                .add(disjunction);
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<String> findOrgEmpIds(List<String> orgIds) {
        Assert.notEmpty(orgIds, "机构岗位员工:查询指定机构下的所有员工ID时,没有指定机构ID!");
        return createCriteria(PositionEmp.class)
                .setProjection(Projections.distinct(Projections.property("empId")))
                .add(Restrictions.in("orgId", orgIds))
                .list();
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<String> findParamEmpIds(List<String> params) {
        Assert.notEmpty(params, "机构岗位员工:查询指定业态下的所有员工ID时,没有指定业态编号!");
        Set<String> set = new HashSet<String>();
        set.addAll(params);
        DetachedCriteria orgIds = findParamOrgIds(set);
        return createCriteria(PositionEmp.class)
                .setProjection(Projections.distinct(Projections.property("empId")))
                .add(Property.forName("orgId").in(orgIds))
                .list();
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<String> findEmpByIds(List<String> ids) {
        Assert.notEmpty(ids, "机构岗位员工:查询指定机构岗位下的所有员工ID时,没有指定机构岗位ID!");
        return createCriteria(PositionEmp.class)
                .setProjection(Projections.distinct(Projections.property("empId")))
                .add(Restrictions.in("id", ids))
                .list();
    }

    @Override
    public String queryId(String orgId, String positionId) {
        Assert.hasText(orgId, "机构岗位员工:查询指定机构岗位ID时,没有指定机构ID!");
        Assert.hasText(positionId, "机构岗位员工:查询指定机构岗位ID时,没有指定岗位ID!");
        return (String) createCriteria(PositionEmp.class)
                .setProjection(Projections.id())
                .add(Restrictions.eq("orgId", orgId))
                .add(Restrictions.eq("positionId", positionId))
                .uniqueResult();
    }
}