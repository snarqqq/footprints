module ApplicationHelper
  def user_icon(user)
    if user.avatar?
      image_tag user.avatar_url, class: "my-navbar__avatar"
    elsif user.image?
      image_tag user.image, class: "my-navbar__avatar"
    else
      fa_icon "user-circle", class: "fa-2x"
    end
  end
end
