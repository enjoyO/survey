package eccrm.base.role.service.impl;

import eccrm.base.parameter.service.ParameterContainer;
import eccrm.base.role.dao.RoleGroupDao;
import eccrm.base.role.domain.Role;
import eccrm.base.role.domain.RoleGroup;
import eccrm.base.role.service.RoleGroupService;
import eccrm.base.role.service.RoleService;
import eccrm.base.role.vo.RoleGroupVo;
import eccrm.base.user.domain.Group;
import eccrm.core.VoHelper;
import eccrm.core.VoWrapper;
import eccrm.utils.Argument;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 * Generated by miles on 2014-07-21.
 */

@Service("roleGroupService")
public class RoleGroupServiceImpl implements RoleGroupService, VoWrapper<RoleGroup, RoleGroupVo> {
    @Resource
    private RoleGroupDao roleGroupDao;

    @Override
    public void save(String groupId, String[] roleIds) {
        Argument.isEmpty(groupId, "保存角色与用户组的关系时,用户组ID不能为空!");
        Argument.isNull(roleIds, "保存角色与用户组的关系时,角色ID数组不能为空!");
        for (int i = 0; i < roleIds.length; i++) {
            RoleGroup roleGroup = new RoleGroup(roleIds[i], groupId);
            roleGroupDao.save(roleGroup);
        }
    }

    @Override
    public void deleteByGroupId(String groupId) {
        roleGroupDao.deleteByGroupId(groupId);
    }

    @Override
    public List<RoleGroupVo> queryByGroups(String[] userGroupIds) {
        List<RoleGroup> roles = roleGroupDao.queryByGroupIds(userGroupIds);
        return VoHelper.wrapVos(roles, this);
    }

    @Override
    public List<RoleGroupVo> queryByGroup(String userGroupId) {
        List<RoleGroup> roles = roleGroupDao.queryByGroupId(userGroupId);
        List<RoleGroupVo> vos = VoHelper.wrapVos(roles, this);
        Collections.sort(vos, new Comparator<RoleGroupVo>() {
            @Override
            public int compare(RoleGroupVo o1, RoleGroupVo o2) {
                return o1.getRolePinYin().compareTo(o2.getRolePinYin());
            }
        });
        return vos;
    }

    @Override
    public void deleteByIds(String[] ids) {
        roleGroupDao.deleteByIds(ids);
    }

    @Override
    public RoleGroupVo wrap(RoleGroup roleGroup) {
        if (roleGroup == null) {
            return null;
        }
        RoleGroupVo vo = new RoleGroupVo();
        vo.setId(roleGroup.getId());
        Role role = roleGroup.getRole();
        vo.setRoleId(role.getId());
        vo.setRoleName(role.getName());
        vo.setRoleCode(role.getCode());
        vo.setRolePinYin(role.getPinyin());
        vo.setRoleEndDate(role.getEndDate());
        vo.setRoleDescription(role.getDescription());
        vo.setRoleState(ParameterContainer.getInstance().getSystemName(RoleService.ROLE_STATE, role.getStatus()));
        Group group = roleGroup.getGroup();
        vo.setGroupId(group.getId());
        vo.setGroupName(group.getName());
        return vo;
    }
}
